import pb from '@/api/pb';

const record = await pb.collection('users').getFullList();

console.log(record);

export default function App() {
  return (
    <>
      <h1>작심하루</h1>
      <h2 id="hello" className="text-2xl">
        소제목
      </h2>
    </>
  );
}
