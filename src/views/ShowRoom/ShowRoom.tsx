import ShowRoom1 from './ShowRoom1';
// import ShowRoom2 from './ShowRoom2';
import ShowRoomEdit from './ShowRoomEdit';

export default function ShowRoom() {
  const isTrue = false;

  return <>{isTrue ? <ShowRoom1 /> : <ShowRoomEdit />}</>;
}
