import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { authStore } from "../../stores/authStore";

const SignIn = () => {
    const {isLogging, login} = authStore()
    const navigate = useNavigate();
    const mdpRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{8,}$/;
    const emailRegex = /[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$/;
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm();

    const stepBack = () => {
        navigate("/opening")
    }

    const onSubmit = async (data) => {
        try {
            const rep = await login(data)
            if(rep) {
                navigate("/");
            }
        } catch (error) {
            console.error(error)
        }
    };

    return (
        <div className="bg-gray-200 flex h-screen w-screen justify-center items-center relative">
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
            <div className="bg-white rounded-sm shadow-sm w-[90%] px-10 relative">
                {/* Loader au-dessus du formulaire */}
                {isLogging && (
                    <div className="absolute top-0 left-0 w-full h-full flex justify-center items-center bg-white/70 z-10">
                        <span className="loading loading-dots loading-lg"></span>
                    </div>
                )}
                <form onSubmit={handleSubmit(onSubmit)} className={isLogging ? "opacity-50" : ""}>
                    <div className="mt-10 flex w-full justify-center">
                        <div>
                            <img src="images/blog-svgrepo-com.svg" alt="logo du site" className='h-24 w-24'/>
                        </div>
                    </div>
                    <div className="mt-10 flex flex-col items-center gap-6">
                        <div className="w-full">
                            <input
                                type="text"
                                placeholder="Email"
                                className="input input-bordered w-full max-w-xs"
                                {...register("email", {
                                    required: true,
                                    pattern: emailRegex,
                                })}
                            />
                            {errors.email?.type === "required" && (
                                <span className="mt-2 text-sm text-red-500">L&apos;email est requis.</span>
                            )}
                            {errors.email?.type === "pattern" && (
                                <span className="mt-2 text-sm text-red-500">Format de l&apos;email invalide.</span>
                            )}
                        </div>
                        <div className="w-full">
                            <input
                                type="password"
                                placeholder="Mot de passe"
                                className="input input-bordered w-full max-w-xs"
                                {...register("password", {
                                    required: true,
                                    pattern: mdpRegex,
                                })}
                            />
                            {errors.password?.type === "required" && (
                                <span className="mt-2 text-sm text-red-500">Le mot de passe est requis.</span>
                            )}
                            {errors.password?.type === "pattern" && (
                                <span className="mt-2 text-sm text-red-500">
                                    Minimum : 1 maj, 1 min, 1 chiffre, 1 spé, 8 caractères.
                                </span>
                            )}
                        </div>
                    </div>
                    <div className="my-10 flex w-full justify-center">
                        <button 
                            className="btn btn-wide text-white font-bold bg-[#4d4a3d] hover:bg-[#302e24]"
                            disabled={isLogging}
                        >
                            {isLogging ? "Connexion..." : "Se connecter"}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default SignIn;
