import RequestAdder from './RequestAdder'
import setEventToId from './SetEventToId'

const Requests = new RequestAdder();
const Events = new setEventToId();

Requests.setComponent()

Events.setEvent("getBtn", Requests.useGetRequest)
