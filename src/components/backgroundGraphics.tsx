 import { ReactComponent as GoToLogo }  from 'assets/logos/GoToLogo.svg';
 import { ReactComponent as Chevron }  from 'assets/graphics/chevron.svg';
 import { ReactComponent as SideBar }  from 'assets/graphics/sideBar.svg';

function BackgroundGraphics() {
    // Out of scopeTODO: Play with the CSS values until they 'look right'
    return (
        <>  
            <Chevron  className='hidden sm:block absolute rotate-[60.48deg] w-40 h-40 md:w-64 md:h-64 sm:left-[-5dvw] sm:bottom-[10dvw] lg:left-[-2dvw]'/>
            <Chevron  className='hidden sm:block absolute rotate-[-148.45deg] w-40 h-40 md:w-64 md:h-64 sm:right-[10dvw] sm:top-[-1rem] md:top-[-2rem]'/>
            <SideBar  className='absolute rotate-[-30.11deg] w-80 bottom-[-7rem] right-[-5rem] sm:w-[30rem] lg:w-[40rem] lg:right-[-15dvh] lg:bottom-0'/>
            <GoToLogo className='absolute w-24 h-24 top-10 left-10 sm:w-32 sm:h-32 lg:w-52 lg:h-52 lg:left-[5dvw] lg:top-[2dvw]'/>
        </>
    );
}

export default BackgroundGraphics;
