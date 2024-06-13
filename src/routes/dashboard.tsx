import { useState, useEffect } from "react";

import { useTranslation } from "react-i18next";
import { useNavigate  } from "react-router-dom";
import { ReactComponent as GoToLogo }  from 'assets/logos/GoToLogo.svg';
import { ReactComponent as Edit } from 'assets/icons/pen.svg';

import { API } from 'api/api';
import ErrorResponse from "types/interfaces/error";

import { Task } from "types/interfaces/tasks";
import { taskSelectors, taskActionCreators } from "storage/taskSlice"; 
import { useAppDispatch, useAppSelector } from "storage/hooks";

import IconButton from "components/buttons/iconButton";
import ToggleButton from "components/buttons/toggleButton";
import TaskCard from "components/taskCard";
import ErrorBanner from "components/errorBanner";

function Dashboard() {
    const { t } = useTranslation();
    const dispatch = useAppDispatch();
    const navigate = useNavigate();

    const [ isScrollingDown, setIsScrollingDown ] = useState(false);
    const [ hasError, setHasError ] = useState(false);

    const taskIds = useAppSelector(state => taskSelectors.getIds(state.tasks, { type: 'task' })) as string[]
    const username = useAppSelector(state => state.user.username)

    const handleScroll = (e: React.UIEvent<HTMLElement>) => {
        const { scrollTop, scrollHeight, clientHeight } = e.target as HTMLElement;
        const scrollRatio = scrollTop / (scrollHeight - clientHeight);
        setIsScrollingDown(scrollRatio > 0.05)
    }

    const createTask = async () => {
        const newEmptyTask: Task | ErrorResponse = await API.post('/', {}, { username: username })

        if ('error' in newEmptyTask) {
            setHasError(true)
        }
        
        dispatch<any>(taskActionCreators.create('task', (newEmptyTask as Task)._id, newEmptyTask))
    }

    const handleFilter = (toggleValue: boolean, property: string) => {
        const order = (a:any, b: any) => toggleValue ? a[property] < b[property] : a[property] > b[property]

        dispatch<any>(taskActionCreators.sort('task', (a, b) => (order(a,b) ? 1 : -1 )))
    }

    useEffect(() => {
        // User may no longer be 'logged in'
        if(!username) {
            navigate('/')
        }
    }, []);

    return (
        <main className="flex flex-row sm:px-20 lg:px-32 xl:px-64 2xl:px-96">
            <article className="relative w-[100dvw] h-[100dvh] flex flex-col">
                <ErrorBanner setHasError={setHasError} className={`transition-all ease-in-out ${hasError ? 'h-20' : 'h-0'}`}/>
                <GoToLogo className={`absolute top-5 left-5 sm:left-[-2rem] transition-all ease-in-out ${isScrollingDown ? 'h-0 w-0' : 'h-20 w-20 sm:h-32 sm:w-32'}`}/>
                <div className={`px-3 transition-all ease-in-out ${isScrollingDown ? 'mt-5' : 'mt-28 sm:mt-40'}`}>
                    <h1 className="text-3xl">{t('dashboard.title')}</h1>
                    <div className="w-full sm:w-[50%] lg:w-[30%] h-[0.15rem] bg-border"/>
                    <div className="pt-5 flex flex-row gap-4 ">
                        <ToggleButton label={'Title'} onToggle={(toggleValue: boolean) => { handleFilter(toggleValue, 'title') }}/>
                        <ToggleButton label={'Date'} onToggle={(toggleValue: boolean) => { handleFilter(toggleValue, 'endDate') }}/>
                        {/* TODO: Later, filter by status */}
                        {/* <DropdownButton label={'Status'} options={Object.keys(Status).filter(key => isNaN(Number(key)))} onSelectOption={() =>{}}/> */}
                    </div>
                    <div className={`max-h-[70dvh] overflow-y-scroll sm:px-5 space-y-5 pb-32 transition-all ease-in-out ${isScrollingDown ? 'mt-5' : 'mt-12'}`} onScroll={handleScroll}>
                        {
                            taskIds.map((taskId) => 
                                <TaskCard key={taskId} taskId={taskId} setHasError={setHasError}/>
                            )
                        }
                        {
                            taskIds.length === 0 &&
                            <div className="flex items-center justify-center text-mediumDarkText h-80">
                                {t('dashboard.taskCards.emptyTaskList')}
                            </div>
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