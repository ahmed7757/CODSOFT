import { useCallback } from "react";
import { IoArrowForward, IoArrowBack } from "react-icons/io5";
function Button2({ content, onClick, active, disabled }) {
    return (
        <button
            className={`flex flex-col cursor-pointer items-center justify-center w-9 h-9 shadow-[0_4px_10px_rgba(0,0,0,0.03)] text-sm font-normal transition-colors rounded-full
            ${active ? "bg-blue-700 text-white hover:bg-blue-700" : "text-blue-500"}
            ${!disabled
                    ? "bg-white hover:bg-blue-500 hover:text-white"
                    : "text-blue-300 bg-white cursor-not-allowed"
                }`}
            onClick={onClick}
            disabled={disabled}
        >
            {content}
        </button>
    );
}

function PaginationNav({
    gotoPage,
    canPreviousPage,
    canNextPage,
    pageCount,
    pageIndex,
}) {
    const renderPageLinks = useCallback(() => {
        if (pageCount === 0) return null;
        const visiblePageButtonCount = 3;
        let numberOfButtons =
            pageCount < visiblePageButtonCount ? pageCount : visiblePageButtonCount;
        const pageIndices = [pageIndex];
        numberOfButtons--;
        [...Array(numberOfButtons)].forEach((_item, itemIndex) => {
            const pageNumberBefore = pageIndices[0] - 1;
            const pageNumberAfter = pageIndices[pageIndices.length - 1] + 1;
            if (
                pageNumberBefore >= 0 &&
                (itemIndex < numberOfButtons / 2 || pageNumberAfter > pageCount - 1)
            ) {
                pageIndices.unshift(pageNumberBefore);
            } else {
                pageIndices.push(pageNumberAfter);
            }
        });
        return pageIndices.map((pageIndexToMap) => (
            <li key={pageIndexToMap}>
                <Button2
                    content={pageIndexToMap + 1}
                    onClick={() => gotoPage(pageIndexToMap)}
                    active={pageIndex === pageIndexToMap}
                />
            </li>
        ));
    }, [pageCount, pageIndex]);
    return (
        <ul className="flex gap-2">
            <li>
                <Button2
                    content={
                        <div className="flex ml-1 rounded-full">
                            <IoArrowBack size="1.5rem" />
                        </div>
                    }
                    onClick={() => gotoPage(0)}
                    disabled={!canPreviousPage}
                />
            </li>
            {renderPageLinks()}
            <li>
                <Button2
                    content={
                        <div className="flex ml-1 rounded-full">
                            <IoArrowForward size="1.5rem" />
                        </div>
                    }
                    onClick={() => gotoPage(pageCount - 1)}
                    disabled={!canNextPage}
                />
            </li>
        </ul>
    );
}

export default PaginationNav;
