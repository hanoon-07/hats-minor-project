import React, { useEffect, useState } from 'react'
import { LoadingRingSmall } from './animation/LoadingRingSmall';
import axios from 'axios';
import { LoadingRing } from './animation/LoadingRing';

export const ClassView = ({classId, classroomName, subjectName}) => {

  const [studentData, setStudentData] = useState([]);
  const [classCode, setClassCode] = useState('---');
  const [copyMsg, setCopyMsg] = useState('');
  const [loadingStudents, setLoadingStudents] = useState(false);
  const [loading, setLoading] = useState(false);

  async function getClassCode() {
    try {
      const response = await axios.get("http://localhost:3000/getClassCode", {
        params: {
          classId: classId,
        },
      });
      //console.log("Response:", response.data);
      setClassCode(response.data.unique_code);
    } catch (error) {
      
    } finally {
      
    }
  }

  async function getData() {
    setLoading(true);
    await getClassCode();
    await getNewStudents();
    setLoading(false);
  }

  useEffect(() => {
    // const newStudents = [];
    // for (let i = 0; i < 70; i++) {
    //   newStudents.push({
    //     Name: "Tom",
    //     UniversityNum: "KNR22CS045",
    //     joinedAt: "12-04-23",
    //     RollNo: 65,
    //   });
    // }
    // setStudentData(newStudents); 

    // get students joined in this class
    // another function
    getData();
  }, []);

  async function getCodeCopy() {
    await navigator.clipboard.writeText(classCode);
    setCopyMsg('code copied!');
    setTimeout(() => {setCopyMsg('');}, 3000);
  }

  async function getNewStudents() {
    setLoadingStudents(true);
    try {
      const response = await axios.get("http://localhost:3000/getClassStudents", {
        params: {
          classId: classId,
        },
      });
      //console.log("Response:", response.data);
      var tempArr = [];
      response.data.map((item, index) => {
        tempArr.push({
          Name: item.name,
          UniversityNum: item.admission_no,
          joinedAt: item.joined_at,
          RollNo: item.roll_no,
        });
      });
      setStudentData(tempArr);
      //setClassCode(response.data);
    } catch (error) {
      
    } finally {
      setLoadingStudents(false);
    }
  }

  return (<>
    {loading && <LoadingRing />}
    <div className='h-full w-full flex flex-col gap-4 p-10 '>
        <div className='flex flex-col gap-2'>
          <h1 className='text-4xl text-[#C1C4C7] font-bold'>{classroomName}</h1>
          <p className='text-[#474AA5] text-lg font-semibold'>{subjectName}</p>
        </div>

        <div className='flex flex-col gap-2'>
          <div className='w-[40%] h-[40px] rounded-sm bg-[#272A2E]  flex flex-row gap-2 items-center pl-2'>
            <p className='text-sm min-w-fit text-[#C1C4C7] font-medium'>class code</p>
            <h2 className='text-lg text-[#A8FF53]'>{classCode}</h2>
            <div className='w-full h-full flex flex-col box-border px-1 py-1 rounded-sm'>
              <div onClick={() => {getCodeCopy()}} className='self-end h-full w-[40px] bg-[#A8FF53] hover:bg-[#5E8834]  grid place-content-center'>
                <svg className='' width="22" height="22" viewBox="0 0 22 22" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M18.3333 7.33333H14.6667V3.26333C14.6634 2.39883 14.3186 1.57066 13.7073 0.959365C13.096 0.348068 12.2678 0.00321977 11.4033 0H3.26333C2.39883 0.00321977 1.57066 0.348068 0.959365 0.959365C0.348068 1.57066 0.00321977 2.39883 0 3.26333V11.4033C0.00321977 12.2678 0.348068 13.096 0.959365 13.7073C1.57066 14.3186 2.39883 14.6634 3.26333 14.6667H7.33333V18.3333C7.33333 19.3058 7.71964 20.2384 8.40727 20.9261C9.09491 21.6137 10.0275 22 11 22H18.3333C19.3058 22 20.2384 21.6137 20.9261 20.9261C21.6137 20.2384 22 19.3058 22 18.3333V11C22 10.0275 21.6137 9.09491 20.9261 8.40727C20.2384 7.71964 19.3058 7.33333 18.3333 7.33333ZM7.33333 11V12.2222H3.26333C3.04615 12.2222 2.83786 12.1359 2.68429 11.9824C2.53072 11.8288 2.44444 11.6205 2.44444 11.4033V3.26333C2.44444 3.04615 2.53072 2.83786 2.68429 2.68429C2.83786 2.53072 3.04615 2.44444 3.26333 2.44444H11.4033C11.6205 2.44444 11.8288 2.53072 11.9824 2.68429C12.1359 2.83786 12.2222 3.04615 12.2222 3.26333V7.33333H11C10.0275 7.33333 9.09491 7.71964 8.40727 8.40727C7.71964 9.09491 7.33333 10.0275 7.33333 11Z" fill="black"/>
                </svg>
              </div>
            </div>
          </div>
          <div>
            <p className='text-[#A8FF53] pl-2'>{copyMsg}</p>
          </div>
        </div>

        <div className='flex flex-col w-[90%] max-h-[400px] rounded-sm outline outline-1 outline-[#212327]'>
          <div className='heading h-[40px] bg-[#15161A] flex flex-row justify-between items-center box-border p-2'>
            <div className='flex flex-row gap-1 items-center'>
              <p className='text-[#C1C4C7]'>students</p>
              <div className='rounded-sm box-border p-2 hover:bg-black' onClick={() => {getNewStudents();}}>
                <svg width="17" height="17" viewBox="0 0 17 17" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M15.2235 11.4835H11.373C11.1476 11.4835 10.9314 11.5731 10.772 11.7325C10.6126 11.8919 10.523 12.1081 10.523 12.3335C10.523 12.5589 10.6126 12.7751 10.772 12.9345C10.9314 13.0939 11.1476 13.1835 11.373 13.1835H13.413C12.4754 14.1633 11.2662 14.8404 9.94089 15.1278C8.61553 15.4152 7.23453 15.2997 5.97531 14.7962C4.71609 14.2927 3.63619 13.4241 2.87435 12.3022C2.11252 11.1803 1.70355 9.85615 1.7 8.5C1.7 8.27457 1.61045 8.05837 1.45104 7.89896C1.29163 7.73955 1.07543 7.65 0.85 7.65C0.624566 7.65 0.408365 7.73955 0.248959 7.89896C0.0895533 8.05837 0 8.27457 0 8.5C0.00449366 10.1599 0.494888 11.7821 1.41066 13.1665C2.32644 14.5509 3.62752 15.6369 5.15333 16.2904C6.67915 16.944 8.36292 17.1365 9.99687 16.8441C11.6308 16.5518 13.1434 15.7875 14.348 14.6455V16.15C14.348 16.3754 14.4376 16.5916 14.597 16.751C14.7564 16.9104 14.9726 17 15.198 17C15.4234 17 15.6396 16.9104 15.799 16.751C15.9584 16.5916 16.048 16.3754 16.048 16.15V12.325C16.0459 12.1054 15.9589 11.8951 15.8052 11.7382C15.6515 11.5814 15.443 11.4901 15.2235 11.4835ZM8.5 0C6.32093 0.00621536 4.22747 0.849077 2.652 2.3545V0.85C2.652 0.624566 2.56245 0.408365 2.40304 0.248959C2.24364 0.0895533 2.02743 0 1.802 0C1.57657 0 1.36037 0.0895533 1.20096 0.248959C1.04155 0.408365 0.952 0.624566 0.952 0.85V4.675C0.952 4.90043 1.04155 5.11663 1.20096 5.27604C1.36037 5.43545 1.57657 5.525 1.802 5.525H5.627C5.85243 5.525 6.06863 5.43545 6.22804 5.27604C6.38745 5.11663 6.477 4.90043 6.477 4.675C6.477 4.44957 6.38745 4.23337 6.22804 4.07396C6.06863 3.91455 5.85243 3.825 5.627 3.825H3.587C4.5241 2.84569 5.73248 2.16877 7.05704 1.88114C8.3816 1.59351 9.7619 1.70828 11.0208 2.21073C12.2796 2.71318 13.3596 3.58038 14.1221 4.70101C14.8846 5.82165 15.2948 7.14458 15.3 8.5C15.3 8.72543 15.3896 8.94163 15.549 9.10104C15.7084 9.26045 15.9246 9.35 16.15 9.35C16.3754 9.35 16.5916 9.26045 16.751 9.10104C16.9104 8.94163 17 8.72543 17 8.5C17 7.38376 16.7801 6.27846 16.353 5.24719C15.9258 4.21592 15.2997 3.27889 14.5104 2.48959C13.7211 1.70029 12.7841 1.07419 11.7528 0.647024C10.7215 0.219859 9.61624 0 8.5 0Z" fill="#A8FF53"/>
                </svg>
              </div>
            </div>

            <div>
              <p className='text-[#A8FF53]'>total <span className='font-medium'>{studentData.length}</span></p>
            </div>
          </div>

          <div className='relative box-border p-4 gap-2 w-full max-h-[300px] min-h-[130px] bg-[#1B1D1F] overflow-y-scroll flex flex-row flex-wrap'>
            {loadingStudents && <LoadingRingSmall />}
            {!loadingStudents && studentData.map((item, index) => {
              return <div className='h-[40px] w-[40px] rounded-[50%] bg-gradient-to-r from-[#474AA5] to-[#333571] grid place-content-center'>
                <h1 className='text-white font-bold'>{item.RollNo}</h1>
              </div>
            })}
            <div>
              <button className='hover:bg-[#5E8834] h-[30px] px-2 absolute bottom-2 font-semibold right-2 bg-[#A8FF53] text-black rounded-sm'>view full</button>
            </div>
          </div>


        </div>

        <div className='flex flex-col gap-2'>
          <h1 className='text-3xl text-[#C1C4C7] font-bold'>Exams</h1>
        </div>
    </div>
  </>)


}
