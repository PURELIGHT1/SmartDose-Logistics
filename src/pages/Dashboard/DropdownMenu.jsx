import PropTypes from 'prop-types';
import { classNames } from 'primereact/utils';
import { Link } from 'react-router-dom';

const DropdownLink = ({
    pathname,
    basepath,
    icon,
    title,
    dropdown,
    addstyle,
}) => { 
    return (
        <li
            className={`flex flex-col items-start navlink select-none cursor-pointer ${addstyle} ${
                pathname.includes(basepath) ? 'bg-blue-100' : ''
            }`}
        >
            <div className="flex w-full items-center">
                <i className={classNames('layout-menuitem-icon', icon)}></i>
                <span className="ml-2">{title}</span>
            </div>
            <div>
                <ul
                    className={`mt-4 flex flex-col gap-y-4 w-full`}
                >
                    {dropdown.map((item) => {
                        const isActive = pathname.includes(item.path);
                        return (
                            <li
                                key={item.title}
                                className={`w-full text-sm font-medium flex items-center gap-x-4 ml-6 ${
                                    isActive ? 'text-blue-600' : ''
                                }`}
                            >
                                <span
                                    className={`rounded-full w-2 h-2 ${
                                        isActive ? 'bg-blue-700' : 'bg-gray-400'
                                    }`}
                                ></span>
                                <Link to={item.path}>{item.title}</Link>
                            </li>
                        );
                    })}
                </ul>
            </div>
        </li>
    );
};

DropdownLink.propTypes = {
    pathname: PropTypes.string.isRequired,
    basepath: PropTypes.string.isRequired,
    icon: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    dropdown: PropTypes.array.isRequired,
    addstyle: PropTypes.string.isRequired,
};


export default DropdownLink;
