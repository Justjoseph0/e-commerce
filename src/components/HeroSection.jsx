import PropTypes from "prop-types";

const HeroSection = ({ title, subtitle }) => {
  return (
    <section className="w-full lg:h-[600px] h-[313px] bg-gradient-to-br from-slate-900 to-slate-800">
      <div className="mx-auto max-w-7xl h-full flex flex-col justify-center items-start md:px-10 px-4">
        <header className="space-y-6">
          <h1 className="text-4xl font-bold lg:text-7xl text-white tracking-tight">
            {title}
          </h1>
          {subtitle && (
            <p className="text-lg lg:text-xl text-slate-300 max-w-xl leading-relaxed">
              {subtitle}
            </p>
          )}
        </header>
      </div>
    </section>
  );
};

HeroSection.propTypes = {
  title: PropTypes.string.isRequired,
  subtitle: PropTypes.string,
};

export default HeroSection;
