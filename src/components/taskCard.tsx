import { useState, useCallback, useMemo } from "react";
import { useTranslation } from "react-i18next";
import throttle from 'lodash.throttle';

import { ReactComponent as Chevron } from 'assets/icons/chevron.svg';
import { ReactComponent as Trash } from 'assets/icons/trash.svg';
import { ReactComponent as CalendarIcon } from 'assets/icons/calendar.svg';

import { API } from 'api/api';
import ErrorResponse from "types/interfaces/error";

import { Task, Status } from "types/interfaces/tasks";
import { taskSelectors, taskActionCreators } from "storage/taskSlice"; 
import { useAppDispatch, useAppSelector } from "storage/hooks";

import IconButton from "./buttons/iconButton";
import DropdownButton from "./buttons/dropdownButton";
import CalendarButton from "./buttons/calendarButton";
import Input from "./textInputs/input";
import TextArea from "./textInputs/textArea";

function TaskCard(props: { 
    taskId: string,
    setHasError: Function
}) {
    const { t } = useTranslation();
    const dispatch = useAppDispatch();
    const username = useAppSelector(state => state.user.username)
    const task = useAppSelector(state => taskSelectors.getEntity(state.tasks, { type: 'task', id: props.taskId })) as Task
    const [isOpen, setIsOpen] = useState(false);

    const formattedDate = (new Date(task.endDate)).toLocaleDateString('en-us').replaceAll('/','.')
    const displayedStatus = new Date(task.endDate) < new Date() ? 'Overdue' : task.status;
    const statusColorpicker =  { 
        [Status.Pending] : 'bg-mainAccent', 
        [Status.Completed]: 'bg-secondaryAccent',
        'Overdue': 'bg-warning'
    }

    const handleDeletion = async () => {
        const deletionResult: {} | ErrorResponse = await API.del('/', { taskId: task._id }, { username: username })
        
        if ('error' in deletionResult) {
            props.setHasError(true)
            return
        }

        dispatch<any>(taskActionCreators.delete('task', props.taskId))
    }

    const fireTaskUpdate = async (update: Partial<Task>) => {
        const updateResult: {} | ErrorResponse = await API.patch('/', { task: update }, { username: username })

        if ('error' in updateResult) {
            props.setHasError(true)
            return
        }

        dispatch<any>(taskActionCreators.update('task', props.taskId, updateResult))      
    }

    const taskUpdateCallback = useCallback(async (update: Partial<Task>) => {   
        const updateResult: {} | ErrorResponse = await API.patch('/', { task: update }, { username: username })

        if ('error' in updateResult) {
            props.setHasError(true)
            return
        }
    }, []);

    const throttleTaskUpdate = useMemo(() => {
        return throttle(taskUpdateCallback, 1000);
    }, [taskUpdateCallback]);
    
    // TODO: Refactor this boilerplate code
    const handleDateSelection = (selectedDate: Date) => {
        fireTaskUpdate({ _id: task._id, endDate: selectedDate })
    }
    
    const handleStatusChange = (newStatus: Status) => {  
        fireTaskUpdate({ _id: task._id, status: newStatus })
    }
    
    const handleDescriptionChange = (newDescription: string) => {
        dispatch<any>(taskActionCreators.update('task', props.taskId, { ...task, description: newDescription })) 
        throttleTaskUpdate({ _id: task._id, description: newDescription})
    }
    
    const handleTitleChange = (newTitle: string) => {
        dispatch<any>(taskActionCreators.update('task', props.taskId, { ...task, title: newTitle })) 
        throttleTaskUpdate({ _id: task._id, title: newTitle})
    }


    return (
        <div className="relative border-[0.1rem] border-border min-h-20 flex flex-row text-mediumDarkText">
            <div className={`w-5 transition-all ease-in-out ${statusColorpicker[displayedStatus]}`}></div>
            <div className="flex flex-col  w-full">
                <div className="flex flex-row items-center h-20 pl-5">
                    {
                        displayedStatus === 'Overdue' &&
                        <p className="text-warning italic pr-5">{t('dashboard.taskCards.overdue')}</p>
                    }
                    <h2 className={`${displayedStatus === 'Overdue' ? 'w-20' : 'w-28'} text-lg lg:w-auto truncate`}>{task.title}</h2>
                    <div className="absolute right-0">
                        <div className="flex flex-row items-center">
                            <p className="mr-5">{formattedDate}</p>
                            <CalendarIcon className="hidden sm:block h-7 w-7 mr-5"/>
                            <IconButton 
                                icon={isOpen ? <Chevron className="transition-all ease-in-out rotate-180"/> : <Chevron/>} 
                                onClick={() =>{setIsOpen(!isOpen)}} 
                                className={'bg-darkBackground w-14 h-20'}
                            />
                        </div>
                    </div>
                </div>
                {
                    isOpen &&
                    <div className="px-5 md:px-20 pt-10 pb-16 space-y-5">
                        <Input 
                            label={t('dashboard.taskCards.titleInputFieldName')} 
                            error={''}
                            content={task.title} 
                            setContent={handleTitleChange}
                            className={'w-full md:w-[50%] md:max-w-80'}
                        />
                        <TextArea 
                            label={t('dashboard.taskCards.descriptionInputFieldName')} 
                            content={task.description} 
                            setContent={handleDescriptionChange}
                            className={'w-full'}
                        />
                        <CalendarButton onDateSelect={handleDateSelection} pickerLabel={formattedDate}/>
                        <DropdownButton 
                            label={`${Status[task.status]}`} 
                            options={[{ title: 'Pending', id: Status.Pending }, {title: 'Completed', id: Status.Completed}]} 
                            onSelectOption={handleStatusChange}
                            className={'rounded-none bg-lightBackground text-mediumDarkText border-border border-[0.15rem] w-40 shadow-none'}
                            iconClassName={'fill-mediumDarkText'}
                            optionsClassName={'bg-mediumDarkBackground text-lightText w-40'}
                            disabled={displayedStatus === 'Overdue'}
                        />
                        <IconButton 
                            icon={<Trash/>} 
                            onClick={handleDeletion}
                            className={'bg-warning w-10 h-10 p-2 absolute right-0 bottom-0'}
                        />
                    </div>
                }
            </div>
        </div>
    );
}

export default TaskCard;
  