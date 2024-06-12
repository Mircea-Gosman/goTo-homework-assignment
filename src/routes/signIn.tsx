import { useTranslation } from "react-i18next";

import Input from "components/textInputs/input";
import TextButton from "components/buttons/textButton";
import BackgroundGraphics from 'components/backgroundGraphics';

function SignIn() {
  const { t } = useTranslation();

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
                        content={''}
                    />
                    <TextButton 
                        label={t('signIn.signInButton')} 
                        className={'w-full h-16 mt-6'}
                        // TODO
                        onClick={ () =>{} }
                    />
                </div>
            </div>
        </article>
    </main>
  );
}

export default SignIn;
