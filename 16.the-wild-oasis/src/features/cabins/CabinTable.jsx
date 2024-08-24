import CabinRow from "./CabinRow";
import Spinner from "../../ui/Spinner";
import { useCabins } from "./useCabins";
import Table from "../../ui/Table";
import { useSearchParams } from "react-router-dom";
import Empty from "../../ui/Empty";
// const Table = styled.div`
//   border: 1px solid var(--color-grey-200);

//   font-size: 1.4rem;
//   background-color: var(--color-grey-0);
//   border-radius: 7px;
//   overflow: hidden;
// `;

// const TableHeader = styled.header`
//   display: grid;
//   grid-template-columns: 0.6fr 1.8fr 2.2fr 1fr 1fr 1fr;
//   column-gap: 2.4rem;
//   align-items: center;

//   background-color: var(--color-grey-50);
//   border-bottom: 1px solid var(--color-grey-100);
//   text-transform: uppercase;
//   letter-spacing: 0.4px;
//   font-weight: 600;
//   color: var(--color-grey-600);
//   padding: 1.6rem 2.4rem;
// `;

function CabinTable() {
  const { isLoading, cabins } = useCabins();
  const [searchParams] = useSearchParams();
  // 1) Filter
  const selectedFilter = searchParams.get("discount") || "all";
  let filteredCabins;
  if(selectedFilter === "all") {
    filteredCabins = cabins;
  } else if(selectedFilter === "no-discount"){
    filteredCabins = cabins.filter(cabin=> cabin.discount === 0);
  } else if(selectedFilter === "with-discount"){
    filteredCabins = cabins.filter(cabin=> cabin.discount > 0);
  }

  //2) Sort
  const selectedSort = searchParams.get("sort-by") || "created_at-asc";

  const [field, order] = selectedSort.split("-");
  const modifier = order === "asc" ? 1 : -1;
  const sortedCabins = filteredCabins?.sort((a,b)=> (a[field] - b[field])*modifier);

  if(isLoading) return <Spinner/>;
  if(!cabins.length) return <Empty resourceName="Cabins" />
  return (
    <Table columns="0.6fr 1.8fr 2.2fr 1fr 1fr 1fr">
      <Table.Header role="row">
        <div></div>
        <div>Cabin</div>
        <div>Capacity</div>
        <div>Price</div>
        <div>Discount</div>
        <div></div>
      </Table.Header>
      {isLoading ? (
        <Spinner />
      ) : (
        // cabins?.map((cabin) => <CabinRow cabin={cabin} key={cabin.id}/>)
        <Table.Body
          data={sortedCabins}
          render={(cabin) => <CabinRow cabin={cabin} key={cabin.id} />}
        />
      )}
    </Table>
  );
}

export default CabinTable;
