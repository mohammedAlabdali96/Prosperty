import React from "react";

export default function CallToAction({
  image = "/assets/image-1.png",
  title = "You’ve found a neighbour you love",
}) {
  return (
    <section className="py-12">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-12 custom-container">
        <div>
          <img src={image} alt="" />
        </div>
        <div className="space-y-4">
          <h4 className="font-bold text-2xl md:text-5xl md:leading-[1.5]">
            {title}
          </h4>
          <p className="text-gray-600 text-sm md:text-lg leading-relaxed md:leading-[1.8]">
            When you owned home, you’re comitting to living in one location for
            a while. In a recent Trulia survey, we found that five out of six
            respondents said finding the right neighbourhood
          </p>
          <button className="btn btn-outline">Contact Us</button>
        </div>
      </div>
    </section>
  );
}
