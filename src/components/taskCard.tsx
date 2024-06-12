import { useState } from "react";
import { useTranslation } from "react-i18next";

import { Task, Status } from "types/interfaces/tasks";
import { ReactComponent as Chevron } from 'assets/icons/chevron.svg';
import { ReactComponent as Trash } from 'assets/icons/trash.svg';
import { ReactComponent as CalendarIcon } from 'assets/icons/calendar.svg';

import IconButton from "./buttons/iconButton";
import DropdownButton from "./buttons/dropdownButton";
import CalendarButton from "./buttons/calendarButton";
import Input from "./textInputs/input";
import TextArea from "./textInputs/textArea";

function TaskCard(props: { 
    task: Task
}) {
    const task = props.task;
    const isOverdue = task.status === Status.Overdue
    const { t } = useTranslation();
    const [isOpen, setIsOpen] = useState(false);
    const statusColorpicker =  { 
        [Status.Pending] : 'bg-mainAccent', 
        [Status.Completed]: 'bg-secondaryAccent',
        [Status.Overdue]: 'bg-warning'
    }

    const handleDateSelection = (selectedDate: Date) => {
        task.endDate = selectedDate; // TODO: manage with setState for update in child
    }

    return (
        <div className="relative border-[0.1rem] border-border min-h-20 flex flex-row text-mediumDarkText">
            <div className={`w-5 ${statusColorpicker[task.status]}`}></div>
            <div className="flex flex-col  w-full">
                <div className="flex flex-row items-center h-20 pl-5">
                    {
                        isOverdue &&
                        <p className="text-warning italic pr-5">{t('dashboard.taskCards.overdue')}</p>
                    }
                    <h2 className={`${isOverdue ? 'w-20' : 'w-28'} text-lg lg:w-auto truncate`}>{task.title}</h2>
                    <div className="absolute right-0">
                        <div className="flex flex-row items-center">
                            <p className="mr-5">{task.endDate.toLocaleDateString('en-us').replaceAll('/','.')}</p>
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
                            content={task.title} 
                            className={'w-full md:w-[50%] md:max-w-44'}
                        />
                        <TextArea 
                            label={t('dashboard.taskCards.descriptionInputFieldName')} 
                            content={task.description} 
                            className={'w-full md:w-[75%] md:max-w-96'}
                        />
                        <CalendarButton onDateSelect={handleDateSelection} pickerLabel={task.endDate.toLocaleDateString().replaceAll('/', '.')}/>
                        <DropdownButton 
                            label={`${Status[task.status]}`} 
                            options={['Pending', 'Completed']} 
                            onSelectOption={()=>{}}
                            className={'rounded-none bg-lightBackground text-mediumDarkText border-border border-[0.15rem] w-40 shadow-none'}
                            iconClassName={'fill-mediumDarkText'}
                            optionsClassName={'bg-mediumDarkBackground text-lightText w-40'}
                        />
                        <IconButton 
                            icon={<Trash/>} 
                            onClick={() => {}}
                            className={'bg-warning w-10 h-10 p-2 absolute right-0 bottom-0'}
                        />
                    </div>
                }
            </div>
        </div>
    );
}

export default TaskCard;
  