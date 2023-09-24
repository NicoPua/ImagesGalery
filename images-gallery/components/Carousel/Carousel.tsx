import React, { Component } from "react";
import Slider from "react-slick";

import { DiNodejs, DiReact, DiNpm, DiMongodb, DiHtml5, DiGithubBadge, DiGitMerge, DiCss3 } from "react-icons/di";
import { SiNextdotjs, SiTypescript, SiTailwindcss, SiUnsplash } from "react-icons/si";

import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";

export default class SimpleSlider extends Component {
    render() {
        const settings = {
            className: "center",
            centerPadding: "60px",
            dots: true,
            infinite: true,
            slidesToShow: 3,
            slidesToScroll: 3,
            arrows: false,
            autoplay: true, // Agrega la opción autoplay para habilitar el desplazamiento automático
            autoplaySpeed: 2000,
        };

        return (
            <div className="w-full h-20">  
                <Slider {...settings}>
                    <div className="h-fit pl-10">
                        <DiNodejs className="h-12 w-12 flex justify-center items-center" />  {/* 1 */}
                    </div>
                    <div className="h-fit pl-10">
                        <DiReact className="h-12 w-12 flex justify-center items-center" />   {/* 2 */}
                    </div>
                    <div className="h-fit pl-10">
                        <SiNextdotjs className="h-12 w-12 flex justify-center items-center"/>   {/* 3 */}
                    </div>

                    <div className="h-fit pl-10">
                        <SiTypescript className="h-12 w-12 flex justify-center items-center"/> {/* 4 */}
                    </div>
                    <div className="h-fit pl-10">
                        <DiMongodb className="h-12 w-12 flex justify-center items-center"/>  {/* 5 */}
                    </div>
                    <div className="h-fit pl-10">
                        <SiTailwindcss className="h-12 w-12 flex justify-center items-center"/>  {/* 6 */}
                    </div>

                    <div className="h-fit pl-10">
                        <DiGithubBadge className="h-12 w-12 flex justify-center items-center"/>  {/* 7 */}
                    </div>
                    <div className="h-fit pl-10">
                        <DiGitMerge className="h-12 w-12 flex justify-center items-center"/>  {/* 8 */}
                    </div>
                    <div className="h-fit pl-10">
                        <SiUnsplash className="h-12 w-12 flex justify-center items-center"/>  {/* 9 */}
                    </div>

                    <div className="h-fit pl-10">
                        <DiNpm className="h-12 w-12 flex justify-center items-center"/>  {/* 10 */}
                    </div>
                    <div className="h-fit pl-10">
                        <DiHtml5 className="h-12 w-12 flex justify-center items-center"/>  {/* 11 */}
                    </div>
                    <div className="h-fit pl-10">
                        <DiCss3 className="h-12 w-12 flex justify-center items-center"/>  {/* 12 */}
                    </div>
                </Slider>
            </div>
        );
    }
}