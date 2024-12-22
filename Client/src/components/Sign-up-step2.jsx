import PropTypes from 'prop-types'

const SignUpStep2 = ({register, errors, password}) => {
    const mdpRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{8,}$/;
    return (
        <div className={`mt-10 flex flex-col items-center gap-6`}>
            <div className="w-full">
                <input
                    type="password"
                    placeholder="Mot de passe"
                    className="input input-bordered w-full max-w-xs"
                    {...register("password", {
                        required: true,
                        pattern: mdpRegex,
                        minLength: 8
                    })}
                />
                {errors.password && (
                    <span className="text-sm text-red-500">
                        Champ requis! Minimum: 1 maj, 1 min, 1 chiffre, 1 spé, 8 car
                    </span>
                )}
            </div>
            <div className="w-full">
                <input
                    type="password"
                    placeholder="Confirmez le Mot de passe"
                    className="input input-bordered w-full max-w-xs"
                    {...register("confirmPassword", {
                        required: "Les mots de passe doivent identiques (Minimum: 1 maj, 1 min, 1 chiffre, 1 spé, 8 car).",
                        minLength: 8,
                        pattern: mdpRegex,
                        validate: value =>
                            value === password || "Les mots de passe doivent identiques (Minimum: 1 maj, 1 min, 1 chiffre, 1 spé, 8 car)."
                    })}
                />
                {errors.confirmPassword && (
                    <span className="mt-2 text-sm text-red-500">
                        Les mots de passe doivent identiques (Minimum: 1 maj, 1 min, 1 chiffre, 1 spé, 8 car).
                    </span>
                )}
            </div>
        </div>
    );
}

SignUpStep2.propTypes = {
    register: PropTypes.func,
    errors: PropTypes.object,
    password: PropTypes.string
}

export default SignUpStep2;
