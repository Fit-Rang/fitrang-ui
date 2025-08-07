interface ButtonProps {
  disp: string;
}
export function Button({ disp }: ButtonProps) {
  return (
    <button className="bg-gold font-montserrat font-bold p-1 rounded-md m-2 px-2 hover:bg-grey hover:text-white hover:border-2">
      {disp}
    </button>
  );
}
