import React from "react";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import { TechCard } from "./TechCard";

const OurTech = () => {


    const departmentsArray = [
        {
            name: "Diabetes Prediction",
            imageUrl: "https://i.ibb.co/6mwf9PB/image.png",
            ai_url: "https://disease-app-gemini.streamlit.app/",
            description: "a"
        },
        {
            name: "OrthHeart Disease Predictionopedics",
            imageUrl: "https://i.ibb.co/SNwv412/image.png",
            ai_url: "https://disease-app-gemini.streamlit.app/",
            description: "b"
        },
        {
            name: "Parkinson's Prediction ",
            imageUrl: "https://i.ibb.co/3kkmCqW/image.png",
            ai_url: "https://disease-app-gemini.streamlit.app/",
            description: "c"
        }
    ];

    const responsive = {
        extraLarge: {
            breakpoint: { max: 3000, min: 1324 },
            items: 4,
            slidesToSlide: 1, // optional, default to 1.
        },
        large: {
            breakpoint: { max: 1324, min: 1005 },
            items: 3,
            slidesToSlide: 1, // optional, default to 1.
        },
        medium: {
            breakpoint: { max: 1005, min: 700 },
            items: 2,
            slidesToSlide: 1, // optional, default to 1.
        },
        small: {
            breakpoint: { max: 700, min: 0 },
            items: 1,
            slidesToSlide: 1, // optional, default to 1.
        },
    };

    return (
        <>
            <div className="container departments w-full mx-auto">
                <h2>Departments</h2>
                <Carousel
                    responsive={responsive}
                    removeArrowOnDeviceType={[
                        // "superLargeDesktop",
                        // "desktop",
                        "tablet",
                        "mobile",
                    ]}
                >

                    <div className="flex w-[1300px] gap-[120px]">


                        <TechCard
                            name="Diabetes Prediction"
                            img_src="https://i.ibb.co/6mwf9PB/image.png"
                            ai_url="https://multiplediseaseprediction0.streamlit.app"
                            desc="Cutting-edge diabetes prediction software leveraging machine learning for personalized risk assessment"

                        ></TechCard>
                        <TechCard
                            name="OrthHeart Disease Predictionopedics"
                            img_src="https://i.ibb.co/SNwv412/image.png"
                            ai_url="https://multiplediseaseprediction0.streamlit.app"
                            desc="Heart disease prediction software harnessing machine learning for early detection and tailored prevention strategies."
                        ></TechCard>

                        <TechCard
                            name="Parkinson's Prediction "
                            img_src="https://i.ibb.co/3kkmCqW/image.png"
                            ai_url="https://multiplediseaseprediction0.streamlit.app"
                            desc="Pioneering Parkinson's disease prediction software integrating machine learning for precise risk assessment and proactive management"
                        ></TechCard>
                    </div>







                </Carousel>
            </div>
        </>
    );
};

export default OurTech;