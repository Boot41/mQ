import React from 'react';

function Card({ title, description, imgSrc, isVideo, className, descriptionOnRight }) {
  return (
    <div className={`relative overflow-hidden rounded-lg ${className}`}>
      <img src={imgSrc} alt={title} className="w-full h-full object-cover rounded-lg" />
      {isVideo ? (
        <>
          <button className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-black bg-opacity-50 text-white rounded-full p-2">
            ▶ 
          </button>
          <div className="absolute top-0 left-0 text-white p-2 rounded-br-lg">
            <h3 className="text-lg font-semibold">{title}</h3>
            <p className="text-sm">{description}</p>
          </div>
        </>
      ) : descriptionOnRight ? (
        <div className="absolute top-0 right-0 bg-white bg-opacity-75 p-2 w-1/2 h-full flex items-center rounded-bl-lg">
          <div>
            <h3 className="text-lg font-semibold">{title}</h3>
            <p className="text-sm">{description}</p>
          </div>
        </div>
      ) : (
        <div className="absolute bottom-0 left-0 bg-white bg-opacity-75 p-2 rounded-br-lg">
          <h3 className="text-lg font-semibold">{title}</h3>
          <p className="text-sm">{description}</p>
        </div>
      )}
    </div>
  );
}

function Fun() {
  return (
    <div className="container mx-auto px-4 py-8 flex flex-col items-center">
      <h2 className="text-2xl font-bold mb-6 text-center">Oh, and it's not only about work!</h2>
      <div className="flex justify-center items-center gap-1 flex-wrap"> {/* Changed gap to 4 */}
        <div className="flex justify-center items-center w-[500px] pr-2"> {/* Center each card container */}
          <Card
            title="TeammattersI"
            description="The team having fun at the spring boot"
            imgSrc="fun2.jpg"
            isVideo={true}
            className="h-[400px]" 
          />
        </div>
        <div className="flex flex-col gap-4 items-center w-[600px] pl-2"> {/* Changed gap to 4 */}
          <div className="flex justify-center items-center h-[175px] w-full"> {/* Center content inside each card */}
            <Card
              title="Teammatters II"
              description="Team retreat at Spring"
              imgSrc="fun6.jpg"
              className="h-full"
              descriptionOnRight={true}
            />
          </div>
          <div className="flex justify-center items-center h-[175px] w-full"> {/* Center content inside each card */}
            <Card
              title="Teammatters III"
              description="Spring retreat at"
              imgSrc="fun5.jpg"
              className="h-full"
              descriptionOnRight={true}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Fun;
