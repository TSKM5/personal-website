import './../css/pages/contact.css'
import Title from "../components/Title";
import UserInput from '../components/action-components/UserInput';
import TextDisplay from '../components/TextDisplay';
import Button from '../components/action-components/Button';
import IconButton from '../components/action-components/IconButton';
import InlineMessage, { CONTENT_NOT_FOUND_ERROR_TEXT } from '../components/InlineMessage';
import LoadingSpinner from '../components/LoadingSpinner';
import { ChangeEvent, useContext, useEffect, useRef, useState } from 'react';
import { postContactForm } from '../services/project-api/FolioApi';
import { LINKEDIN_URL, GITHUB_URL } from '../utils/constants/Endpoints';
import { isValidEmail, isValidName } from '../utils/helperFunctions';
import { externalNavigate } from '../utils/navigation';
import { Helmet } from 'react-helmet';
import { CmsDataContext, DataSegment } from '../services/context/DataServiceContext';
import { ContactPageContent } from '../utils/types/CoreTypesMapping';

enum InputStatus {
    IDLE = "IDLE",
    INVALID = "INVALID",
    VALID = "VALID"
}

type InputState = {
    status: InputStatus;
    value:string;
}

enum APIStatus {
    IDLE = "IDLE",
    LOADING = "LOADING",
    SUCCESS = "SUCCESS",
    ERROR = "ERROR"
}

export default function Contact() {
    const cmsContext = useContext(CmsDataContext);
    const contactContentReturn: DataSegment<ContactPageContent> = cmsContext?.getContactPageData() ?? { isLoading: true, data: null, isError: false };
    const nameInputRef = useRef<HTMLInputElement>(null);
    const [nameValue, setNameValue] = useState<InputState>({status: InputStatus.IDLE, value:''});
    const emailInputRef = useRef<HTMLInputElement>(null);
    const [emailValue, setEmailValue] = useState<InputState>({status: InputStatus.IDLE, value:''});
    const [messageValue, setMessageValue] = useState<string>('');
    const [apiState, setApiState] = useState<APIStatus>(APIStatus.IDLE);

    const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setNameValue(nameValue => ({...nameValue, value:e.target.value}));
    }

    const handleEmailChange = (event: ChangeEvent<HTMLInputElement>) => {
        setEmailValue(emailValue => ({...emailValue, value:event.target.value}));
    }

    const handleMessageChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        setMessageValue(e.target.value);
    }

    const handleClear = () => {
        setNameValue({status: InputStatus.IDLE, value:''});
        setEmailValue({status: InputStatus.IDLE, value:''});
        setMessageValue('');
    }

    const handleFormSubmit = () => {
        const callApi = async () => {
            setApiState(APIStatus.LOADING);
            const result:boolean = await postContactForm({
                name:nameValue.value,
                email:emailValue.value,
                message:messageValue
            });
            if(result){
                setApiState(APIStatus.SUCCESS);
                handleClear();
            } else {
                setApiState(APIStatus.ERROR);
            }
        };
        const emailIsValid = isValidEmail(emailValue.value);
        const nameIsValid = isValidName(nameValue.value);
        if(emailIsValid && nameIsValid && apiState !== APIStatus.LOADING){
            callApi();
        } else {
            if(!emailIsValid){
                setEmailValue(emailValue => ({...emailValue, status: InputStatus.VALID}));
            }
            if(!nameIsValid){
                setNameValue(nameValue => ({...nameValue, status: InputStatus.INVALID}));
            }
        }
    }

    useEffect(() => {
        const validateEmail = () => {
            if (emailInputRef.current && isValidEmail(emailValue.value)) {
                setEmailValue(emailValue => ({...emailValue, status: InputStatus.VALID}));
            } else {
                setEmailValue(emailValue => ({...emailValue, status: InputStatus.INVALID}));
            }
        };

        if (emailInputRef.current) {
            emailInputRef.current.addEventListener('focusout', validateEmail);

            return () => emailInputRef.current?.removeEventListener('focusout', validateEmail);
        }
    }, [emailValue]);

    useEffect(() => {
        const validateName = () => {
            if(nameInputRef.current && isValidName(nameValue.value)){
                setNameValue(nameValue => ({...nameValue, status: InputStatus.VALID}));
            } else {
                setNameValue(nameValue => ({...nameValue, status: InputStatus.INVALID}));
            }
        }
        if(nameInputRef.current) {
            nameInputRef.current.addEventListener('focusout', validateName);

            return () => nameInputRef.current?.removeEventListener('focusout', validateName);
        }
    }, [nameValue]);

    if (!contactContentReturn || !contactContentReturn.data || contactContentReturn.isLoading) {
        return <LoadingSpinner />
    } else if(contactContentReturn.isError){
        return <InlineMessage text={CONTENT_NOT_FOUND_ERROR_TEXT}/> 
    } else if (apiState === APIStatus.ERROR) {
        return <InlineMessage text='There was an error sending your message. Please try again later.'/>
    }
    return (
        <>
            <Helmet>
                <title>Contact Me</title>
                <meta name="description" content="Send me a message with your details and I will get back to you." />
            </Helmet>
            <Title text="Contact Me" />
            {
                apiState === APIStatus.SUCCESS ?  (
                    <InlineMessage classOverride='contact-form-input-success' textClassOverride='contact-form-input-success-text' text='Your message was sent successfully!' successImage={true} />
                ) : <></>
            }
            <TextDisplay overrideClass='contact-me-text' text={contactContentReturn.data.text} />
            <div className='contact-form-container'>
                {
                    nameValue.status === InputStatus.INVALID ? <InlineMessage classOverride='contact-form-input-error' text='Name must be greater than 1 character and not contain any numbers or special characters.' redErrorImage={true} textClassOverride='contact-form-input-error-text'/> : <></>
                }
                <UserInput ref={nameInputRef} placeHolderText={'Name'} type={'text'} value={nameValue.value} changeHandlerCallback={handleNameChange}/>
                {
                    emailValue.status === InputStatus.INVALID ? <InlineMessage classOverride='contact-form-input-error' text='Email is incorrectly formatted.' redErrorImage={true} textClassOverride='contact-form-input-error-text'/> : <></>
                }
                <UserInput placeHolderText={'Email'} type={'email'} ref={emailInputRef} value={emailValue.value} changeHandlerCallback={handleEmailChange}/>
                <textarea className='contact-form-message-input' placeholder='Message' value={messageValue} onChange={(event) => handleMessageChange(event)}/>
            </div>
            <div className='contact-form-button-container'>
                <Button classOverride='contact-form-button-clear' text='Clear' callback={handleClear} />
                <Button classOverride='contact-form-button-submit' text='Submit' callback={handleFormSubmit} />
            </div>
            {
                apiState === APIStatus.LOADING ? (
                        <LoadingSpinner />
                ) : <></>
            }
            <div className='contact-form-button-container'>
                <IconButton asset={{default:'/icons/linkedin/In-Blue.png'}} callback={() => externalNavigate(LINKEDIN_URL)} />
                <IconButton asset={{default:'/icons/github/github-black.png'}} callback={() => externalNavigate(GITHUB_URL)} />
            </div>
        </>
    )
}