export const handleClickOutside = (ref, callback) => (event) => {
    if (ref.current && !ref.current.contains(event.target)) {
      callback();
    }
  };