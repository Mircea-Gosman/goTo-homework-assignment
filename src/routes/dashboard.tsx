import { useState } from "react";

import { useTranslation } from "react-i18next";
import { ReactComponent as GoToLogo }  from 'assets/logos/GoToLogo.svg';
import { ReactComponent as Edit } from 'assets/icons/pen.svg';

import { Task, Status } from "types/interfaces/tasks";
import DropdownButton from "components/buttons/dropdownButton";
import IconButton from "components/buttons/iconButton";
import ToggleButton from "components/buttons/toggleButton";
import TaskCard from "components/taskCard";

function Dashboard() {
    const { t } = useTranslation();
    const [ isScrollingDown, setIsScrollingDown ] = useState(false);

    const handleScroll = (e: React.UIEvent<HTMLElement>) => {
        const { scrollTop, scrollHeight, clientHeight } = e.target as HTMLElement;
        const scrollRatio = scrollTop / (scrollHeight - clientHeight);
        setIsScrollingDown(scrollRatio > 0.05)
    }

    const tasks: Task[] = [
        {
            id: '1',
            creatorId: '1',
            title: 'Task 1 Title2121212112',
            description: 'description',
            endDate: new Date(),
            status: Status.Overdue,
        },
        {
            id: '2',
            creatorId: '1',
            title: 'Task 2 Title',
            description: 'description',
            endDate: new Date(),
            status: Status.Completed,
        },
        {
            id: '3',
            creatorId: '1',
            title: 'Task 3 Title',
            description: 'description',
            endDate: new Date(),
            status: Status.Pending
        },
    ]

    const createTask = () => {
        // TODO
    }

    return (
        <main className="flex flex-row sm:px-20 lg:px-32 xl:px-64 2xl:px-96">
            <article className="relative w-[100dvw] h-[100dvh] flex flex-col">
                <GoToLogo className={`absolute top-5 left-5 sm:left-[-2rem] transition-all ease-in-out ${isScrollingDown ? 'h-0 w-0' : 'h-20 w-20 sm:h-32 sm:w-32'}`}/>
                <div className={`px-3 transition-all ease-in-out ${isScrollingDown ? 'mt-5' : 'mt-28 sm:mt-40'}`}>
                    <h1 className="text-3xl">{t('dashboard.title')}</h1>
                    <div className="w-full sm:w-[50%] lg:w-[30%] h-[0.15rem] bg-border"/>
                    <div className="pt-5 flex flex-row gap-4 ">
                        <ToggleButton label={'Title'} onToggle={() =>{}}/>
                        <ToggleButton label={'Date'} onToggle={() =>{}}/>
                        <DropdownButton label={'Status'} options={Object.keys(Status).filter(key => isNaN(Number(key)))} onSelectOption={() =>{}}/>
                    </div>
                    <div className={`max-h-[70dvh] overflow-y-scroll sm:px-5 space-y-5 pb-32 transition-all ease-in-out ${isScrollingDown ? 'mt-5' : 'mt-12'}`} onScroll={handleScroll}>
                        {
                            tasks.map((task) => 
                                <TaskCard task={task}/>
                            )
                        }
                    </div>
                </div>
                <IconButton 
                    icon={<Edit/>} 
                    onClick={createTask}
                    className={'absolute p-1 z-100 shadow-xl bg-secondaryAccent  w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24 bottom-5 right-5 sm:right-[-2rem] md:right-[-3rem] lg:right-[-5rem] xl:right-[-8rem] sm:bottom-10 '}
                />
            </article>
        </main>
    );
}

export default Dashboard;