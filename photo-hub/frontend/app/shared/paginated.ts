export class Paginated {
    public _page: number;
    public _pageSize: number;
    public _pagesCount: number;
    public _totalCount: number;
    public  numberOfPages: number = 4;

    constructor(page: number = 1, pageSize: number = 30, pagesCount: number = 0, totalCount: number = 0) {
        this._page = page;
        this._pageSize = pageSize;
        this._pagesCount = pagesCount;
        this._totalCount = totalCount;
    }

    showLeftButtons(): boolean {
        if (this.numericButtons().indexOf(1) == -1)
            return true
        return false
    }

    showRightButtons(): boolean {
        if (this.numericButtons().indexOf(this._pagesCount) == -1)
            return true
        return false
    }

    calculatePagesCount(): void {
        this._pagesCount = Math.ceil(this._totalCount/this._pageSize);
    }

    numericButtons(): Array<number> {
        var result = [];

        if (this._pagesCount <= this.numberOfPages){
            for(var i = 1; i <= this._pagesCount; ++i)
                result.push(i)
        }
        else{
            let half = Math.floor(this.numberOfPages/2);
            let left = this._page - half;
            let right = this._page + half;
            if(left < 1){
                right -= left;
                left = 1;
            }
            for(var i = left; i <= right; ++i)
                result.push(i)
        }

        return result
    }

    pagePlus(count: number): number {
        return + this._page + count;
    }

    search(i): void {
        this._page = i;
    };
}