'use client';

import { deleteProduct } from '@/actions';
import { MdOutlineDeleteOutline } from "react-icons/md";

interface Props {
  id: string;
}

export const DeleteButton = ( { id }: Props ) => {
  return (
    <button onClick={ () => {deleteProduct( id )} }>
      <MdOutlineDeleteOutline size={ 25 } />
    </button>
  );
};


