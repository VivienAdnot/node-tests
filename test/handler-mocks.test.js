import myHandlerMethod from './handler';
import getAcknowledgementByUserId from './index/model';

jest.mock('./index/model');

test('mock is called', () => {

    myHandlerMethod();

    expect(getAcknowledgementByUserId).toHaveBeenCalledTimes(1);

});
