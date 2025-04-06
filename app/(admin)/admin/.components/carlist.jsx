import { Plus } from 'lucide-react';
import React from 'react'
import { Button } from '@/components/ui/button';

const CarList = () => {
  return (
    <div>
      <div>
        <Button>
          <Plus className='h-4 w-4'/> Add Car
        </Button>
      </div>
    </div>
  )
}
export default CarList;
