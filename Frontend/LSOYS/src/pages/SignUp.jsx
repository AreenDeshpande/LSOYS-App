const Signup = () => {
  return (
    <div className="flex flex-col items-center mt-20">
      <h2 className="text-xl font-bold">Signup</h2>
      <input type="text" placeholder="Username" className="border p-2 m-2" />
      <input type="password" placeholder="Password" className="border p-2 m-2" />
      <select className="border p-2 m-2">
        <option value="farmer">Farmer</option>
        <option value="transporter">Transporter</option>
      </select>
      <button className="bg-green-500 text-white p-2">Signup</button>
    </div>
  );
};
export default Signup;