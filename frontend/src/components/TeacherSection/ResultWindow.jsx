import React, { useEffect, useState } from 'react'
import { motion } from 'framer-motion';
import axios from 'axios'
import {LoadingRingSmall} from '../animation/LoadingRingSmall'
import { ResultBox } from './ResultBox';
import ResultTable from './ResultTable';
import { convertToPDFandDownload } from '../../features/ExamResultDownload/ConvertPDF';
import { convertToXLSXandDownload } from '../../features/ExamResultDownload/ConvertXLSX';

export const ResultWindow = ({examId, setShow}) => {

    const [downloadStatus, setDownloadStatus] = useState(null);
    const [resultData, setResultData] = useState(null);
    const [resultDataDownload, setResultDataDownload] = useState([]);
    const [initData, setInitData] = useState(null);

    useEffect(() => {
        var timer1 = null;
        if(downloadStatus != null) {
            timer1 = setTimeout(() => {
                setDownloadStatus(null);
            }, 2000);
        } 

        return () => {
            clearTimeout(timer1);
        }
    }, [downloadStatus]);

    const [loading, setLoading] = useState(false);

    useEffect(() => {
        async function getExamData() {
            setLoading(true);
            try {
                const response = await axios.get('https://hats-minor-project-production.up.railway.app/getResult', {
                    params: { examId: examId }
                });
                
                console.log(response.data);
                setInitData(response.data);
                const mergedResults = {};
                
                // Merge results with same rollNo
                response.data.studentResultInfo.forEach((student) => {
                    const rollNo = student.rollNo;
                    if (!mergedResults[rollNo]) {
                        mergedResults[rollNo] = {
                            name: student.name,
                            rollNo: student.rollNo,
                            universityId: student.universityId,
                            score: student.score,
                            testPassed: student.testPassed,
                            totalTest: student.totalTest,
                            present: student.present, // ✅ preserve present attribute
                            partialOutput: student.partialOutput
                        };
                    } else {
                        mergedResults[rollNo].testPassed += student.testPassed;
                        mergedResults[rollNo].totalTest += student.totalTest;
                        mergedResults[rollNo].score += student.score;
                
                        // If any student record has present = true, keep it as true
                        mergedResults[rollNo].present = mergedResults[rollNo].present || student.present;
                    }
                });
                
                // Convert merged object to array
                const mergedArray = Object.values(mergedResults);
                mergedArray.forEach((element) => {
                    if(element.testPassed != 0) {
                        element.score = parseInt(Math.ceil((element.testPassed/element.totalTest) * 100))
                    }
                })

                // Sort by roll number
                mergedArray.sort((a, b) => parseInt(a.rollNo) - parseInt(b.rollNo));
                
                // For download data, format keys
                const downLoadData = mergedArray.map(student => ({
                    Name: student.name,
                    "Roll Number": student.rollNo,
                    "University ID": student.universityId,
                    Score: student.score,
                    "Test case passed": student.testPassed,
                    "Total test cases": student.totalTest,
                    
                }));
                
                // Set states
                setResultDataDownload(downLoadData);
                setResultData({ studentResultInfo: mergedArray });
                
            } catch(error) {
                console.log('Something went wrong! result fetching!');
            } finally {
                setLoading(false);
            }
        }

        getExamData();
    }, []);


    return (
      <div className="z-50 absolute top-0 left-0 h-screen w-screen bg-[#15171a]/70 backdrop-blur-[3px] grid place-content-center">
        {loading && <LoadingRingSmall />}
        {downloadStatus !=null && <DownloadWinodow downloadStatus={downloadStatus}/>}
        <motion.div initial={{opacity: 0}} animate={{opacity: 1}} className="relative flex flex-col box-border p-2 gap-1 w-[80vw] h-[80vh] bg-[#1b1d1f] outline outline-1 outline-[#484d57] rounded-sm">
          <div className="flex flex-row items-center justify-between">
            <div className="flex flex-row font-semibold gap-2 items-center">
              <p className="text-3xl text-[#c1c4c7] ml-4">{resultData == null?'-----':resultData.examName}</p>
            </div>
            <div className='absolute top-2 right-2'>
                <CloseLogo setShowWindow={setShow}/>
            </div>
          </div>

          <div className="ml-4 mt-4">
            <div className="flex-row flex gap-2 justify-between">
              <div className='flex flex-row gap-[30px]'>
                <div className="flex flex-row gap-2">
                    <div className="h-[30px] w-[30px] rounded-full bg-[#A8FF53] grid place-content-center">{initData?initData.present:'-'}</div>
                    <p className="text-[#C1C4C7]">{initData?'present':'-----'}</p>
                </div>

                <div className="flex flex-row gap-2">
                    <div className="h-[30px] w-[30px] rounded-full bg-[#5F97F3] grid place-content-center">{initData?initData.total:'-'}</div>
                    <p className="text-[#C1C4C7]">{initData?'total':'-----'}</p>
                </div>

                <div className="flex flex-row gap-2">
                    <div className="h-[30px] w-[30px] rounded-full bg-[#F43F5E] grid place-content-center">{initData?(initData.total - initData.present):'-'}</div>
                    <p className="text-[#C1C4C7]">{initData?'absent':'-----'}</p>
                </div>
              </div>

              <div className='flex flex-row gap-2'>
                <div onClick={() => {setDownloadStatus('pdf'); convertToPDFandDownload(resultDataDownload, `${initData.examName}.pdf`)}} className='w-[173px] h-[30px] cursor-pointer box-border px-2 translate-y-1 outline outline-0 outline-white hover:outline-1 bg-[#272a2e] rounded-sm flex flex-row items-center gap-4'>
                    <p className='text-yellow-400'>download as pdf</p>
                    <PDFlogo />
                </div>

                <div  onClick={() => {setDownloadStatus('xlsx'); convertToXLSXandDownload(resultDataDownload, `${initData.examName}.xlsx`)}} className='w-[170px] gap-4 cursor-pointer h-[30px] box-border px-2 translate-y-1 outline outline-0 outline-white hover:outline-1 bg-[#272a2e] rounded-sm flex flex-row items-center'>
                    <p className='text-[#A8FF53]'>download as xlsx</p>
                    <XLSXlogo />
                </div>
              </div>

              
            </div>
            <div className='mt-4'>
                <p className='text-[#F43F5E]'>*red indicate absent students</p>
              </div>
          </div>

          <div className="border-t-2 border-dashed border-gray-500 translate-y-[10px]"></div>

          <div className='w-full h-full overflow-y-scroll scroller pt-2'>
            {resultData && <ResultTable resultData={resultData}/>}
          </div>
        </motion.div>
      </div>
    );
}

function CloseLogo({setShowWindow}) {
    return <div className='hover:scale-125' onClick={() => {setShowWindow(false)}}>
        <svg  width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M9.40994 8.00019L15.7099 1.71019C15.8982 1.52188 16.004 1.26649 16.004 1.00019C16.004 0.733884 15.8982 0.478489 15.7099 0.290185C15.5216 0.101882 15.2662 -0.00390625 14.9999 -0.00390625C14.7336 -0.00390625 14.4782 0.101882 14.2899 0.290185L7.99994 6.59019L1.70994 0.290185C1.52164 0.101882 1.26624 -0.00390601 0.999939 -0.00390601C0.733637 -0.00390601 0.478243 0.101882 0.289939 0.290185C0.101635 0.478489 -0.00415253 0.733884 -0.00415254 1.00019C-0.00415254 1.26649 0.101635 1.52188 0.289939 1.71019L6.58994 8.00019L0.289939 14.2902C0.19621 14.3831 0.121816 14.4937 0.0710478 14.6156C0.0202791 14.7375 -0.00585938 14.8682 -0.00585938 15.0002C-0.00585938 15.1322 0.0202791 15.2629 0.0710478 15.3848C0.121816 15.5066 0.19621 15.6172 0.289939 15.7102C0.382902 15.8039 0.493503 15.8783 0.615362 15.9291C0.737221 15.9798 0.867927 16.006 0.999939 16.006C1.13195 16.006 1.26266 15.9798 1.38452 15.9291C1.50638 15.8783 1.61698 15.8039 1.70994 15.7102L7.99994 9.41018L14.2899 15.7102C14.3829 15.8039 14.4935 15.8783 14.6154 15.9291C14.7372 15.9798 14.8679 16.006 14.9999 16.006C15.132 16.006 15.2627 15.9798 15.3845 15.9291C15.5064 15.8783 15.617 15.8039 15.7099 15.7102C15.8037 15.6172 15.8781 15.5066 15.9288 15.3848C15.9796 15.2629 16.0057 15.1322 16.0057 15.0002C16.0057 14.8682 15.9796 14.7375 15.9288 14.6156C15.8781 14.4937 15.8037 14.3831 15.7099 14.2902L9.40994 8.00019Z" fill="#F43F5E"/>
        </svg>
    </div>
}

function PDFlogo() {
    return <svg width="21" height="21" viewBox="0 0 21 21" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M9.16391 14.0595C9.06129 13.9258 8.93043 13.8164 8.78066 13.7392C8.6093 13.6553 8.42016 13.6141 8.22941 13.6191C8.06141 13.6191 7.90719 13.6526 7.76741 13.7189C7.62763 13.7858 7.51147 13.8921 7.42091 14.0391H7.41041V13.692H6.70166V17.3571H7.44716V16.0709H7.45766C7.54888 16.2041 7.66504 16.3038 7.80679 16.3727C7.94854 16.441 8.10341 16.4745 8.27141 16.4745C8.47091 16.4745 8.64482 16.4357 8.79378 16.359C8.93959 16.2848 9.06696 16.179 9.16654 16.0492C9.26629 15.9199 9.34044 15.771 9.38966 15.6023C9.43917 15.432 9.46392 15.2554 9.46316 15.078C9.46366 14.8907 9.43893 14.7041 9.38966 14.5234C9.34474 14.3558 9.26811 14.1983 9.16391 14.0595ZM8.68616 15.3772C8.66516 15.4822 8.62907 15.5747 8.57853 15.6528C8.52809 15.7317 8.45973 15.7976 8.37903 15.8451C8.28509 15.8966 8.17898 15.9218 8.07191 15.918C7.96575 15.9211 7.86066 15.896 7.76741 15.8451C7.68552 15.7983 7.61618 15.7323 7.56529 15.6528C7.51201 15.5685 7.47465 15.4751 7.45504 15.3772C7.43213 15.272 7.42069 15.1646 7.42091 15.057C7.42091 14.9454 7.43141 14.8365 7.45241 14.7321C7.47104 14.6334 7.50751 14.5389 7.56004 14.4532C7.61269 14.3669 7.68736 14.2961 7.77639 14.2481C7.86541 14.2001 7.96559 14.1767 8.06666 14.1802C8.18544 14.1802 8.2865 14.2058 8.36854 14.257C8.45032 14.3068 8.51949 14.3749 8.57066 14.4558C8.62316 14.5385 8.66122 14.6324 8.68354 14.7374C8.7065 14.8424 8.71766 14.9493 8.71766 15.057C8.71766 15.1652 8.70716 15.2716 8.68616 15.3772ZM10.4712 13.7366C10.3202 13.8153 10.1955 13.9197 10.0958 14.0496C9.9935 14.184 9.91696 14.3362 9.87004 14.4985C9.81884 14.6699 9.79319 14.8479 9.79391 15.0268C9.79391 15.2151 9.8195 15.3969 9.87004 15.5728C9.92057 15.7473 9.99604 15.9022 10.0958 16.0367C10.1955 16.1719 10.3222 16.2789 10.4764 16.357C10.6306 16.4357 10.8091 16.4751 11.0119 16.4751C11.1904 16.4751 11.3505 16.443 11.4923 16.3787C11.6368 16.311 11.7569 16.2003 11.8362 16.0617H11.8467V16.4062H12.5554V12.6577H11.8099V14.0227H11.7994C11.7166 13.8908 11.5971 13.7859 11.4555 13.7208C11.3118 13.6533 11.155 13.6184 10.9962 13.6185C10.8141 13.6144 10.6339 13.655 10.4712 13.7366ZM11.5002 14.2544C11.5796 14.302 11.647 14.3674 11.697 14.4453C11.7482 14.5241 11.7837 14.6153 11.8047 14.7183C11.8474 14.9323 11.8474 15.1527 11.8047 15.3667C11.7837 15.4717 11.7489 15.5656 11.6997 15.6476C11.6515 15.7288 11.5838 15.7967 11.5028 15.8451C11.4088 15.8966 11.3027 15.9218 11.1957 15.918C11.0917 15.9208 10.989 15.8947 10.899 15.8425C10.8171 15.7913 10.7473 15.723 10.6943 15.6423C10.6384 15.5565 10.5984 15.4614 10.5762 15.3615C10.5517 15.2583 10.5393 15.1525 10.5394 15.0465C10.5394 14.9349 10.5506 14.8273 10.5735 14.7236C10.5944 14.6261 10.6317 14.5329 10.6838 14.448C10.7344 14.368 10.8038 14.3015 10.8859 14.2544C10.9806 14.2023 11.0876 14.1767 11.1957 14.1802C11.3021 14.1759 11.4076 14.2016 11.5002 14.2544ZM13.2799 16.4062H14.0254V14.1907H14.5399V13.6913H14.0254V13.5292C14.0254 13.417 14.0471 13.3376 14.091 13.2903C14.1343 13.2431 14.2072 13.2195 14.3089 13.2195C14.4034 13.2195 14.4946 13.2247 14.5819 13.2346V12.6787C14.5189 12.6748 14.4539 12.6708 14.3877 12.6656C14.3213 12.6603 14.2547 12.6577 14.1882 12.6577C13.8837 12.6577 13.6566 12.7345 13.5057 12.8894C13.3554 13.0429 13.2799 13.2405 13.2799 13.482V13.6913H12.8337V14.1907H13.2799V16.4062Z" fill="#F1183D"/>
        <path d="M11.8125 0.65625H3.9375V20.3438H17.0625V5.90625L11.8125 0.65625ZM15.75 19.0312H5.25V1.96875H11.1562V6.5625H15.75V19.0312Z" fill="#F1183D"/>
    </svg>
}

function XLSXlogo() {
    return <svg width="16" height="19" viewBox="0 0 16 19" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path fill-rule="evenodd" clip-rule="evenodd" d="M0 2.28027H11.8879V7.73174H1.18048V8.78298L0 7.73174V2.28027ZM3.88054 8.16409V19H2.61797C2.34142 19 2.09027 18.8873 1.90851 18.7066C1.72675 18.5259 1.61339 18.2762 1.61339 18.0012V8.16409H3.88054ZM4.31442 1.8489V0H14.9954C15.272 0 15.5231 0.112702 15.7049 0.293414C15.8866 0.474126 16 0.723819 16 0.998773V14.5735H12.4439C12.1976 14.5735 11.9729 14.6736 11.8107 14.8349C11.6484 14.9962 11.5478 15.2187 11.5478 15.4645V19H4.31344V8.16409H12.3208V1.8489H4.31344H4.31442ZM1.61339 1.8489V0.998773C1.61339 0.723819 1.72675 0.474126 1.90851 0.293414C2.09027 0.112702 2.34142 0 2.61797 0H3.88054V1.8489H1.61339ZM15.9179 15.0059L15.9052 15.0185L13.8833 17.0287L11.9963 18.9048L11.9836 18.9174V15.4635C11.9836 15.3372 12.0354 15.2225 12.1195 15.14C12.2035 15.0564 12.3188 15.0049 12.4449 15.0049H15.9189L15.9179 15.0059ZM2.00525 4.9822L1.03292 3.56177H1.78049L2.39125 4.49934L3.00592 3.56177H3.73298L2.76064 4.97443L3.77402 6.45316H3.02645L2.37464 5.46216L1.71795 6.45316H0.9909L2.00428 4.9822H2.00525ZM3.9851 3.56177H4.62518V5.87508H6.07537V6.45316H3.98607V3.56177H3.9851ZM7.32328 6.49494C7.10145 6.49494 6.88451 6.45705 6.67147 6.38126C6.45844 6.30548 6.26397 6.18889 6.09003 6.03247L6.46821 5.58263C6.60111 5.69048 6.73792 5.775 6.87766 5.83913C7.01741 5.90228 7.17083 5.93434 7.33696 5.93434C7.46986 5.93434 7.57344 5.91005 7.64674 5.86245C7.72003 5.81387 7.75716 5.7478 7.75716 5.6623V5.65356C7.75716 5.61178 7.74934 5.57583 7.73469 5.54377C7.71905 5.51171 7.69071 5.48256 7.64771 5.45536C7.60472 5.42815 7.5451 5.39998 7.46888 5.37278C7.39266 5.34557 7.29396 5.31642 7.17181 5.28631C7.02522 5.25036 6.89232 5.21052 6.7731 5.1668C6.65388 5.12308 6.55323 5.06867 6.47016 5.00358C6.3871 4.93848 6.3226 4.85784 6.27668 4.76166C6.23075 4.66547 6.20827 4.54597 6.20827 4.40218V4.39343C6.20827 4.2613 6.23368 4.1418 6.28352 4.0359C6.33335 3.93 6.40371 3.83867 6.49362 3.76094C6.58352 3.68419 6.69102 3.62492 6.81512 3.58315C6.94021 3.54137 7.07702 3.52097 7.22653 3.52097C7.43957 3.52097 7.63599 3.55303 7.81482 3.61618C7.99365 3.67933 8.15782 3.77066 8.30734 3.88919L7.97508 4.36817C7.84511 4.27976 7.7171 4.21078 7.59299 4.15929C7.4679 4.10876 7.3438 4.08253 7.21871 4.08253C7.09363 4.08253 7.00079 4.10682 6.93825 4.15443C6.87571 4.20301 6.84444 4.26227 6.84444 4.33417V4.34291C6.84444 4.38955 6.85323 4.43035 6.8718 4.46436C6.88939 4.49836 6.92262 4.52945 6.96952 4.55763C7.01643 4.58483 7.08093 4.61107 7.16301 4.63633C7.2451 4.66159 7.34771 4.68976 7.47279 4.7228C7.61937 4.76166 7.75032 4.80441 7.86563 4.85299C7.98094 4.90156 8.07769 4.95889 8.15684 5.0269C8.236 5.09394 8.29561 5.1736 8.33567 5.26396C8.37574 5.35529 8.39626 5.46313 8.39626 5.59041V5.59915C8.39626 5.74197 8.36988 5.86925 8.31711 5.98098C8.26434 6.09271 8.19105 6.18598 8.09723 6.26176C8.00342 6.33754 7.89104 6.39487 7.76107 6.43567C7.6311 6.47551 7.48647 6.49591 7.32914 6.49591L7.32328 6.49494ZM9.47316 4.98318L8.50082 3.56274H9.2484L9.85916 4.50031L10.4738 3.56274H11.2009L10.2285 4.9754L11.2419 6.45413H10.4944L9.84255 5.46313L9.18585 6.45413H8.4588L9.47218 4.98318H9.47316Z" fill="#34A853"/>
    </svg>
}

function DownloadWinodow({downloadStatus}) {

    if(downloadStatus == 'pdf') return <div className='z-50 h-screen w-screen absolute grid place-content-center'>
        <motion.div className='w-[200px] h-[80px] bg-red-500 rounded-sm grid place-content-center'>
            <p className='font-semibold text-white text-lg'>pdf file downloaded</p>
        </motion.div>
    </div>

    else if(downloadStatus== 'xlsx') {
        return <div className='z-50 h-screen w-screen absolute grid place-content-center'>
            <motion.div className='w-[200px] h-[80px] bg-green-600 rounded-sm grid place-content-center'>
                <p className='font-semibold text-white text-lg'>xlsx file downloaded</p>
            </motion.div>
        </div>
    }

    else return null;
}