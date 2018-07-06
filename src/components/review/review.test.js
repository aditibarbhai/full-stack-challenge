import React from 'react';
import renderer from 'react-test-renderer';
import { shallow } from 'enzyme';
import { Review } from './review';

jest.mock('../../utilities/api-calls.js');
import * as apiCalls from '../../utilities/api-calls';

describe('Review tests', () => {
    let props = {};

    beforeEach(() => {
        props = {
            location: {
                state: {
                    reviewer: {
                        id: 1
                    },
                    todo: {
                        toReview: {
                            id: 2
                        }
                    }
                }
            },
            classes: {
                backButton: ''
            }
        };
    });

    afterEach(() => {
        jest.clearAllMocks();
    });

    it ('should render without errors', () => {
        const tree = renderer
            .create(<Review {...props} />)
            .toJSON();

        expect(tree).toMatchSnapshot();
    });

    it ('updateConnectionText should update state.connection to value of user input', () => {
        const wrapper = shallow(<Review {...props} />);

        wrapper.instance().updateConnectionText({ target: { value: 'test' } });

        expect(wrapper.state().connection).toBe('test');
    });

    it ('updateReviewText should update state.review to value of user input', () => {
        const wrapper = shallow(<Review {...props} />);

        wrapper.instance().updateReviewText({ target: { value: 'test review' } });

        expect(wrapper.state().review).toBe('test review');
    });

    it ('submitReview call addReview if state.id is falsy', () => {
        const wrapper = shallow(<Review {...props} />),
            newReview = {
                connection: '',
                review: '',
                reviewer: props.location.state.reviewer.id,
                reviewee: props.location.state.todo.toReview.id,
                published: false
            };

        wrapper.instance().submitReview(false);

        expect(apiCalls.addReview).toHaveBeenCalledWith(newReview);
    });

    it ('submitReview call updateReview if state.id is defined', () => {
        const wrapper = shallow(<Review {...props} />),
            newReview = {
                id: 3,
                connection: '',
                review: '',
                reviewer: props.location.state.reviewer.id,
                reviewee: props.location.state.todo.toReview.id,
                published: true
            };

        wrapper.setState({ id: 3 });

        wrapper.instance().submitReview(true);

        expect(apiCalls.updateReview).toHaveBeenCalledWith(newReview);
    });
});