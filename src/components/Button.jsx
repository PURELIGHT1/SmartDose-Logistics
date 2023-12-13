import PropTypes from 'prop-types';
import { classNames } from '../helper/util/classNames';

const Button = ({ isloading, children, type = 'button', className, ...props }) => {
  return (
    <button
      {...props}
      disabled={isloading}
      type={type}
      className={classNames(
        `py-2 px-6 mr-2 text-sm font-medium text-whiterounded border border-gray-200 focus:z-10 inline-flex items-center disabled:cursor-not-allowed disabled:opacity-50`,
        className
      )}
    >
      {isloading === 1 && (
        <svg
          role="status"
          className="inline mr-2 w-4 h-4 text-gray-200 animate-spin"
          viewBox="0 0 100 101"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          {/* ... SVG paths ... */}
        </svg>
      )}
      {isloading ? 'Loading...' : children}
    </button>
  );
};

Button.propTypes = {
  isloading: PropTypes.oneOfType([PropTypes.number, PropTypes.bool]),
  children: PropTypes.node,
  type: PropTypes.string,
  className: PropTypes.string,
};

export default Button;