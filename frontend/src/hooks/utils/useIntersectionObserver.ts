const FIRST_ELEMENT = 0;
const THRESHOLD_NUMBER = 1.0;

const useIntersectionObserver = (callback: Function) => {
  const observer = new IntersectionObserver(
    (entries) => {
      if (entries[FIRST_ELEMENT].isIntersecting) callback();
    },
    { threshold: THRESHOLD_NUMBER }
  );

  return { observer };
};

export default useIntersectionObserver;
