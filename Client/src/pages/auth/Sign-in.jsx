import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import axios from "axios";
import toast from "react-hot-toast";
import TokenContext from "../../contexts/token.context";

const SignIn = () => {
    const [isLoading, setIsLoading] = useState(false);
    const { login } = useContext(TokenContext);
    const navigate = useNavigate();
    const {
        register,
        handleSubmit,
        setValue,
        formState: { errors },
    } = useForm();
    const mdpRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{8,}$/;
    const emailRegex = /[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$/;

    const onSubmit = async (data) => {
        try {
            setIsLoading(true);
            const rep = await axios.post("http://localhost:8080/api/users/signIn", data);
            setValue("email", "");
            setValue("password", "");
            login(rep.data.token);
            setIsLoading(false);
            navigate("/");
            toast.success(rep.data.message);
        } catch (error) {
            setValue("email", "");
            setValue("password", "");
            setIsLoading(false);
            toast.error(error.response.data.message);
        }
    };

    return (
        <div className="bg-gray-200 flex h-screen w-screen justify-center items-center relative">
            <div className="bg-white rounded-sm shadow-sm w-[90%] px-10 relative">
                {/* Loader au-dessus du formulaire */}
                {isLoading && (
                    <div className="absolute top-0 left-0 w-full h-full flex justify-center items-center bg-white/70 z-10">
                        <span className="loading loading-dots loading-lg"></span>
                    </div>
                )}
                <form onSubmit={handleSubmit(onSubmit)} className={isLoading ? "opacity-50" : ""}>
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
                            {errors.email && (
                                <span className="mt-2 text-sm text-red-500">
                                    Champ requis! Veuillez saisir un email valide
                                </span>
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
                            {errors.password && (
                                <span className="mt-2 text-sm text-red-500">
                                    Champ requis! Minimum: 1 maj, 1 min, 1 chiffre, 1 spé, 8 car
                                </span>
                            )}
                        </div>
                    </div>
                    <div className="my-10 flex w-full justify-center">
                        <button className="btn btn-wide text-white font-bold bg-[#4d4a3d] hover:bg-[#302e24]">
                            Se connecter
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default SignIn;
