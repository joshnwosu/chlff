import ShowRoom1 from './ShowRoom1';
import ShowRoom2 from './ShowRoom2';

export default function ShowRoom() {
  const isTrue = true;

  return <>{isTrue ? <ShowRoom1 /> : <ShowRoom2 />}</>;
}
