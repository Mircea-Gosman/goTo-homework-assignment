import { useState } from "react";
import { useTranslation } from "react-i18next";
import { useNavigate  } from "react-router-dom";

import Input from "components/textInputs/input";
import TextButton from "components/buttons/textButton";
import BackgroundGraphics from 'components/backgroundGraphics';

import { API } from 'api/api';
import { taskActionCreators } from 'storage/taskSlice'
import { create } from "storage/userSlice";
import { useAppDispatch } from "storage/hooks";
import { Task } from "types/interfaces/tasks";
import ErrorResponse from "types/interfaces/error";

function SignIn() {
    const { t } = useTranslation();
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const [ username, setUsername ] = useState('')
    const [ error, setError ] = useState('')

    const signIn = async () => {
        if (!username)  {
            setError(t('signIn.incompleteError'))
            return;
        }

        const tasks: Task[] | ErrorResponse = await API.get('/user', {}, { username: username })
        console.log(tasks)

        if ('error' in tasks) {
            setError(t('signIn.serverError'))
            return
        }

        // Save user access key (simplifying to username).
        dispatch(create(username))

        // Save retrieved tasks.
        dispatch<any>(taskActionCreators.batch(
            ...tasks.map((task:Task) => taskActionCreators.create('task', task._id, task))
        ))

        navigate('/dashboard')
    }
    
    return (
        <main>
            <article className="w-[100dvw] h-[100dvh] flex items-center justify-center relative overflow-hidden">
                <BackgroundGraphics/>
                <div className="mt-10">
                    <h1 className="text-4xl lg:text-5xl text-center">{t('signIn.title')}</h1>
                    <h2 className="text-2xl lg:text-3xl text-center text-secondaryAccent mt-4">{t('signIn.subtitle')}</h2>
                    <div className="mt-12 w-full">
                        <Input 
                            label={t('signIn.inputLabel')} 
                            error={error}
                            content={username}
                            setContent={setUsername}
                            onFocus={() => setError('')}
                        />
                        <TextButton 
                            label={t('signIn.signInButton')} 
                            className={'w-full h-16 mt-6'}
                            onClick={signIn}
                        />
                    </div>
                </div>
            </article>
        </main>
    );
}

export default SignIn;