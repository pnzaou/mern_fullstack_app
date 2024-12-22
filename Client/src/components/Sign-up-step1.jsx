import { useState } from 'react';
import PropTypes from 'prop-types'

const SignUpStep1 = ({register, errors}) => {
    const [image, setImage] = useState(null)

    const handleFileChange = (e) => {
        const file = e.target.files[0]
        if(file) {
            const imageUrl = URL.createObjectURL(file)
            setImage(imageUrl)
        }
    }
    const emailRegex = /[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$/
    return (
        <div className={`mt-10 flex flex-col items-center gap-6`}>
            <div className="relative">
                <div className="avatar">
                    <div className="rounded-full w-24">
                        {image ? (
                            <img
                                src={image}
                                alt="Preview"
                            />
                            ) : (
                            <img
                                src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp"
                                alt='preview'
                            />
                        )}
                    </div>
                </div>
                <div className='absolute top-10 -right-10'>
                    <div className="relative flex items-center justify-center w-24 h-24">
                    <input
                        type="file"
                        accept="image/*"
                        {...register("image")}
                        onChange={handleFileChange}
                        className="absolute inset-0 w-full h-full opacity-0 cursor-pointer rounded-full"
                    />
                        <div className="w-[50px] h-[50px] bg-[#4d4a3d] hover:bg-[#302e24] rounded-full flex items-center justify-center border-[3px] border-white">
                            <img src="/images/camera-svgrepo-com 1.svg" alt="icône caméra" className="w-6 h-6"/>
                        </div>
                    </div>
                </div>
            </div>
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
                    <span className="text-sm text-red-500">
                        Champ requis! Veuillez saisir un email valide
                    </span>
                )}
            </div>
            <div className="w-full">
                <input
                    type="text"
                    placeholder="Nom complet"
                    className="input input-bordered w-full max-w-xs"
                    {...register("userName", {
                        required: true
                    })}
                />
                {errors.userName && (
                    <span className="text-sm text-red-500">
                        Ce champ est obligatoire!
                    </span>
                )}
            </div>
            <div className="w-full">
                <input
                    type="text"
                    placeholder="Pseudo"
                    className="input input-bordered w-full max-w-xs"
                    {...register("pseudo", {
                        required: true
                    })}
                />
                {errors.pseudo && (
                    <span className="text-sm text-red-500">
                        Ce champ est obligatoire!
                    </span>
                )}
            </div>
        </div>
    );
}

SignUpStep1.propTypes = {
    register: PropTypes.func,
    errors: PropTypes.object
}

export default SignUpStep1;
