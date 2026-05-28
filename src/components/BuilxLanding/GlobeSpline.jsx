import Spline from '@splinetool/react-spline';

export default function GlobeSpline() {
  return (
    <div className="w-full h-[500px] md:h-[600px] flex items-center justify-center">
      <Spline scene="https://prod.spline.design/8OEQGka7noJcJdkK/scene.splinecode" />
    </div>
  );
}