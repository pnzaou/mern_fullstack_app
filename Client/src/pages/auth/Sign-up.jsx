import axios from "axios";
import { useState } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import SignUpStep1 from "../../components/Sign-up-step1";
import SignUpStep2 from "../../components/Sign-up-step2";

const SignUp = () => {
    const [step, setStep] = useState(1)
    const navigate = useNavigate()
    const {register, handleSubmit, formState:{errors}, watch} = useForm()

    const password = watch("password")

    const stepBack = () => {
        if(step > 1) {
            setStep(step - 1)
        }
        if(step === 1) {
            navigate("/opening")
        }
    }

    const onSubmit = async (data) => {
        try {
            if(step < 2) {
                setStep(step + 1)
            } else {
                const formData = new FormData()

                Object.keys(data).forEach(key => {
                    if(key !== 'image'){
                        formData.append(key, data[key])
                    }
                })

                if(data.image && data.image.length > 0) {
                    formData.append("image", data.image[0])
                }

                const rep = await axios.post("http://localhost:8080/api/users/signUp", formData)
                navigate("/connexion")
                toast.success(rep.data.message)
            }
        } catch (error) {
            toast.error(error.response?.data?.message || "Erreur lors de l'inscription ! Veuillez réessayer.")
        }
    }

    return (
        <div className="flex h-screen w-screen justify-center items-center">
            <div className="absolute top-0 left-0 mt-10 ml-11">
                <div className="flex items-center justify-center border border-gray-300 rounded-xl"style={{
                    height: 52,
                    width: 52
                }}  onClick={stepBack}>
                    <img
                        src="images/back-svgrepo-com.svg"
                        alt="Icon de retour"
                        className="w-8 h-8"
                    />
                </div>
            </div>
            <div className="w-[90%] px-10">
                <form onSubmit={handleSubmit(onSubmit)}>
                    {step === 1 && <SignUpStep1 register={register} errors={errors}/>}
                    {step === 2 && <SignUpStep2 register={register} errors={errors} password={password}/>}
                    <div className="mt-24 flex w-full justify-center">
                        <button className="btn btn-wide text-white font-bold bg-[#4d4a3d] hover:bg-[#302e24]">
                            {step < 2 ? "Continuer" : "S'inscrire"}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default SignUp;
