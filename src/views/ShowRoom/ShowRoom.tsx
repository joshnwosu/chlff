// import ShowRoom1 from './ShowRoom1';
import ShowRoom2 from './ShowRoom2';
import ShowRoomEdit from './ShowRoomEdit';

export default function ShowRoom() {
  const isTrue = true;

  return <>{isTrue ? <ShowRoom2 /> : <ShowRoomEdit />}</>;
}
