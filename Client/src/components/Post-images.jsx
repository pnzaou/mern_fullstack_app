import PropTypes from "prop-types";

const PostImages = ({ images }) => {

    if(images.length === 0) {
        return null
    }

    return (
        <div className="mt-5">
            <div
                className={`grid gap-1 ${
                    images.length === 1
                     ? "grid-cols-1"
                     : images.length === 2
                     ? "grid-cols-2"
                     : 
                     "grid-cols-[1fr_1fr]"
                }`}
            >
                {images.length === 1 && (
                    <div 
                     className={`
                     w-full
                     h-44
                     bg-cover
                     bg-center
                     rounded-lg
                    `}
                    style={{ backgroundImage: `url(${images[0]})` }}
                    > 
                    </div>
                )}
                {images.length === 2 && 
                    images.map((img, idx) => (
                        <div
                         key={idx}
                         className={`
                          h-44
                          bg-cover
                          bg-center
                          ${idx === 0? "rounded-tl-lg rounded-bl-lg" : "rounded-tr-lg rounded-br-lg"}
                         `}
                         style={{ backgroundImage: `url(${img})` }}
                        ></div>
                    ))
                }
                {images.length === 3 && (
                    <>
                        <div
                         className={`
                          h-full
                          bg-cover
                          bg-center
                          rounded-l-lg
                         `}
                         style={{ backgroundImage: `url(${images[0]})` }}
                        ></div>
                        <div className="grid grid-rows-2 gap-2">
                            <div
                            className={`
                            h-24
                            bg-cover
                            bg-center
                            rounded-tr-lg
                            `}
                            style={{ backgroundImage: `url(${images[1]})` }}
                            ></div>
                            <div
                            className={`
                            h-24
                            bg-cover
                            bg-center
                            rounded-br-lg
                            `}
                            style={{ backgroundImage: `url(${images[1]})` }}
                            ></div>
                        </div>
                    </>
                )}
                {images.length === 4 && 
                    images.map((img, idx) => (
                        <div 
                            key={idx}
                            className={`
                             w-full
                             h-24
                             bg-cover
                             bg-center
                             ${idx === 0 && "rounded-tl-lg"}
                             ${idx === 1 && "rounded-tr-lg"}
                             ${idx === 2 && "rounded-bl-lg"}
                             ${idx === 3 && "rounded-br-lg"}
                            `}
                            style={{ backgroundImage: `url(${img})` }}
                        ></div>
                    ))
                }
            </div>
        </div>
    );
}

PostImages.propTypes = {
    images: PropTypes.array
}

export default PostImages;
