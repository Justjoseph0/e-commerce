import PropTypes from 'prop-types'; 
const HeroSection = ({
  backgroundImage,
  title,
  subtitle,
}) => {
  return (
    <section
      className="w-full lg:h-[600px] h-[313px] bg-cover bg-center relative"
      style={{ backgroundImage: `url(${backgroundImage})` }}
    >
      <div className="absolute inset-0 bg-black bg-opacity-50"></div>
      <div className="relative z-10 flex flex-col justify-center items-start h-full md:px-10 px-4">
        <header className="space-y-6">
          <h3 className="text-4xl font-playfair lg:text-9xl font-bold text-custom-beige leading-tight">
            {title}
          </h3>
          {subtitle && (
            <p className="text-lg  lg:text-xl text-white max-w-xl leading-relaxed">
              {subtitle}
            </p>
          )}
        </header>
      </div>
    </section>
  );
};

HeroSection.propTypes = {
  backgroundImage: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  subtitle: PropTypes.string,
};


export default HeroSection;
