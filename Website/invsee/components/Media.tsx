interface MediaProps {
    src: string
    size?: "small" | "medium" | "large"
    type: "music" | "video"
}



const Media = ({
    src,
    size = "large",
    type
} : MediaProps) => {


    const video_size = (prop: "w" | "h") => {
        switch (size) {
            case "small": {
                if (prop === "w") return "320"
                if (prop === "h") return "240" 
            }
            case "medium": {
                if (prop === "w") return "620"
                if (prop === "h") return "440"
            }
            case "large": {
                if (prop === "w") return "1240"
                if (prop === "h") return "880"
            }
        }
    }

    return (
        <video width={video_size("w")} height={video_size("h")} controls>
            <source src={src} type={type === "video" ? "video/mp4" : "audio/mpeg"}/>
            Your browser does not support the video tag.
        </video>
    )
}

export default Media;