import React, { useEffect, useRef, useState } from 'react'
import Button from '../Button';
import { Settings } from 'lucide-react';
import { motion } from 'framer-motion';
import Dropdown from '../Dropdown';
import classNames from 'classnames';
import leetCodeImage from '../../assets/theme-images/leet-code.png';
import atomImage from '../../assets/theme-images/one-dark.png'
import { useDispatch, useSelector } from 'react-redux';
import { changeFontSize, changeTheme } from '../../features/editor/SettingsSlice';

const Editorsettings = () => {


    const [open, setOpen] = useState(false);
    const settingsRef = useRef(null);
    const [selected, setSelected] = useState('theme');
    const [theme, setTheme] = useState(0);
    const [fontSize, setFontIndex] = useState(3);

    const handleClickOutside = (event) => {
        if (settingsRef.current && !settingsRef.current.contains(event.target)) {
          setOpen(false);
        }
    };

    useEffect(() => {
        

        document.addEventListener("mousedown", handleClickOutside);
        
        return () => {
          document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);

    var themes = ['leet-code', 'atom-one-dark', 'leet-code-light'];
    var fontSizes = ['14', '15' ,'16', '17', '18', '19', '20', '21'];

    const dispatch = useDispatch();
    
    function sizeChange(index) {
        setFontIndex(index);
        dispatch(changeFontSize(fontSizes[index]));
    }

    function changeThemeHere(index) {
        setTheme(index);
        dispatch(changeTheme(themes[index]));
    }

    return (
        <>
            <div className=''>
                <div onClick={() => {setOpen(true);}} className='bg-[#3B82F6] shadow-md hover:text-white grid place-content-center w-[30px] h-[30px] rounded-[4px]'>
                    <motion.div whileTap={{rotate: '180deg'}}>
                        <Settings className='text-white hover:text-textGray' size={15}/>
                    </motion.div>
                </div>

                {open && <motion.div initial={{opacity: 0}} animate={{opacity: 1}} transition={{delay: 0.2}} className='z-20  w-[100vw] backdrop-blur-[2px] absolute h-screen top-0 left-0 grid place-content-center'>
                    <motion.div ref={settingsRef} initial={{opacity: 0, y: -30}} animate={{opacity: 1, y: 0}} transition={{delay: 0.2, duration: 0.1}} className=' opacity-100 flex rounded-md flex-row items-center w-[500px] min-h-[400px] bg-darkGray outline outline-1 outline-[#23324A]'>
                        <div className='w-[40%] h-[100%] flex flex-col gap-[20px] items-center box-border p-[20px]'>
                            <Button  action={setSelected} param={'theme'} label={'theme'} buttonClass={classNames('bg-[#3B82F6] text-white w-[160px] hover:bg-[#2D2173] outline outline-1 outline-none ',{'bg-darkGray outline-buttonGray':selected=='theme'})}/>
                            <Button  action={setSelected} param={'font-family'} label={'font-family' } buttonClass={classNames('bg-[#3B82F6] text-white w-[160px] hover:bg-[#2D2173] outline outline-1 outline-none ',{'bg-darkGray outline-buttonGray':selected=='font-family'})}/>
                            <Button  action={setSelected} param={'font-size'} label={'font-size'} buttonClass={classNames('bg-[#3B82F6] text-white w-[160px] hover:bg-[#2D2173] outline outline-1 outline-none ',{'bg-darkGray outline-buttonGray':selected=='font-size'})}/>
                        </div>
                        <div className='min-w-[1px] h-[90%] bg-textGray'>

                        </div>
                            
                        <div className='w-[60%] h-[100%] flex flex-col items-center p-[30px] '>
                            {selected == 'theme' && <div className='flex flex-col justify-center gap-3'>
                                <Dropdown action={changeThemeHere} items={themes} selected={themes[theme]}/>

                                <div className='w-[100%] p-[4px] outline outline-1 outline-textGray'>
                                    {themes[theme] == 'leet-code' && <img src={leetCodeImage}></img>}
                                    {themes[theme] == 'atom-one-dark' && <img src={atomImage}></img>}
                                    
                                </div>
                            </div>}

                            {selected == 'font-family' && <div className='flex flex-col justify-center gap-3'>
                                <div className='w-[100%] p-[4px] '>
                                    <h3 className='text-red-500'>coming soon!</h3>
                                </div>
                            </div>}

                            {selected == 'font-size' && <div className='flex flex-col justify-center gap-3'>
                                <div className='min-w-[200px] flex flex-row gap-2 items-center'>
                                    <Dropdown action={sizeChange} items={fontSizes} selected={fontSizes[fontSize]}/>
                                    <p  className='text-buttonGreen2' style={{fontSize: fontSizes[fontSize]+'px'}}>Hello <span className='text-blue-600'>World</span></p>
                                </div>

                            </div>}
                        </div>
                    </motion.div>
                </motion.div>}     
            </div>
        </>
    )
}

export default Editorsettings;
