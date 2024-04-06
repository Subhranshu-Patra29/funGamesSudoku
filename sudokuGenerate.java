import java.util.*;
public class sudokuGenerate
{
    int sudo[][];
    int missing;

    //parameterised constructor
    sudokuGenerate(int missing)
    {
        this.missing = missing;
        sudo = new int[9][9];
    }

    //func to start filling the sudoku grid
    public void startFilling()
    {
        //first filling the 3 diagonal sub(3 X 3) grids
        fillDiagonal();

        //fill the remaining sub grids
        fillRemain(0, 3);

        //remove missing elements from the grid as per the difficulty level
        removeMissing();
    }

    public void fillDiagonal()
    {
        for(int i = 0; i < 9; i += 3)
            fillSubGrid(i,i);
    }
    
    //func to check if a number is used in a sub grid or not 
    public boolean notUsedinSubGrid(int row, int col, int num)
    {
        for(int i = 0; i < 3; i++)
        {
            for(int j = 0; j < 3; j++)
            {
                if(sudo[row + i][col + j] == num)
                    return false;
            }
        }
        return true;
    }

    // fill a subgrid
    // by taking a random no. in the range 1 - 9
    // and checking if it is present in the sub grid or not
    // if not present put it else search for another no.
    public void fillSubGrid(int row, int col)
    {
        for(int i = 0; i < 3; i++)
        {
            for(int j = 0; j < 3; j++)
            {
                int temp = 0;
                do
                {
                    temp = (int)(Math.random() * 9 + 1);
                }while(!notUsedinSubGrid(row, col, temp));
                sudo[row + i][col + j] = temp;
            }
        }
    }


    public boolean notUsedinRow(int row, int num)
    {
        for(int i = 0; i < 9; i++)
        {
            if(sudo[row][i] == num)
                return false;
        }
        return true;
    }

    public boolean notUsedinCol(int col, int num)
    {
        for(int i = 0; i < 9; i++)
        {
            if(sudo[i][col] == num)
                return false;
        }
        return true;
    }

    public boolean checkSafe(int row, int col, int num)
    {
        return (notUsedinRow(row, num) && notUsedinCol(col, num) && notUsedinSubGrid(row - row % 3, col - col % 3, num));
    }

    public boolean fillRemain(int i, int j)
    {
        if(j >= 9 && i < 8)
        {
            i++;
            j = 0;
        }
        if(i >= 9 && j >= 9)
            return true;
        if(i < 3)
        {
            if(j < 3)
                j = 3;
        }
        else if(i < 6)
        {
            if(j == (int)(i/3) * 3)
                j += 3;
        }
        else
        {
            if(j == 6)
            {
                i++;
                j = 0;
                if(i >= 9)
                    return true;
            }
        }

        for(int k = 1; k <= 9; k++)
        {
            if(checkSafe(i, j, k))
            {
                sudo[i][j] = k;
                if(fillRemain(i, j + 1))
                    return true;
                sudo[i][j] = 0;
            }
        }
        return false;
    }

    public void removeMissing()
    {
       while (missing != 0) 
       {
            int cellno = (int)(Math.random() * 81 + 1) - 1;
            int row = cellno / 9;
            int col = cellno % 9;
            
            if(sudo[row][col] != 0)
            {
                missing--;
                sudo[row][col] = 0;
            }
       } 
    }
    public static void main(String[] args) 
    {
        Scanner in = new Scanner(System.in);
        System.out.print("Enter no. of missing terms in sudoku: ");
        int missing = in.nextInt();   
        in.close();

        sudokuGenerate ob = new sudokuGenerate(missing);
        ob.startFilling();

        for(int i = 0; i < 9; i++)
        {
            for(int j = 0; j < 9; j++)
            {
                System.out.print(ob.sudo[i][j] + " ");
            }
            System.out.println();
        }
    }
}