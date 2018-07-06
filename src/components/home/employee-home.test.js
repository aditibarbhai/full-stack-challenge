import React from 'react';
import renderer from 'react-test-renderer';
import { shallow } from 'enzyme';
import { EmployeeHome } from './employee-home';

describe('Employee Home tests', () => {

    let props = {};

    beforeEach(() => {
        props = {
            employee: {},
            history: {
                push: jest.fn()
            }
        };
    });

    afterEach(() => {
        jest.clearAllMocks();
    });

    it ('should render without errors', () => {
        const tree = renderer
            .create(<EmployeeHome {...props} />)
            .toJSON();

        expect(tree).toMatchSnapshot();
    });

    it ('handleReviewLinkClick should call history.push with id and todo object', () => {
        const wrapper = shallow(<EmployeeHome {...props} />),
            todo = { id: 0, employee: 1, toReview: {} };

        wrapper.instance().handleReviewLinkClick(1, todo);

        expect(props.history.push).toHaveBeenCalledWith(
            '/review/1',
            { reviewer: props.employee, todo }
        );
    });
});