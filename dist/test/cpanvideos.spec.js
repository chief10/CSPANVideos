"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const chai = require("chai");
const request = require("request");
const src_1 = require("../src");
const dummydata_1 = require("./dummydata");
const expect = chai.expect;
describe("cspanvideos", () => {
    it("Should have the proper url.", () => {
        expect(src_1.cspanvids.CSPAN_BASE_URL).to.equal("https://www.c-span.org/person/?");
    });
    it("Should have the _makeRequest method available", () => {
        expect(src_1.cspanvids).to.have.property("_makeRequest");
    });
    describe("_parseRequestForData", () => {
        const mockDom = dummydata_1.dummyData().mockCSPANDom;
        const rp = src_1.cspanvids._parseRequestForData(mockDom);
        it("Should detect proper amount of li elements", () => {
            expect(rp.length).to.be.equal(6);
        });
        it("Should provide proper for each element", () => {
            expect(rp[0].thumbnail).to.be.a('string');
            expect(rp[3].date).to.be.a('string');
            expect(rp[4].title).to.be.a('string');
        });
    });
    describe("_isBadURL", () => {
        it("Should get the proper URL when a bad one is provided", () => {
            request(src_1.cspanvids.CSPAN_BAD_URL + "Ted Cruz", (err, response, body) => {
                const isBadURL = src_1.cspanvids._isBadURL(body);
                expect(isBadURL).to.be.true;
            });
        });
    });
    describe("fetchVideoData", () => {
        it("Should work as expected for a normal name format", (done) => {
            src_1.cspanvids.fetchVideoData("Marco Rubio")
                .then((data) => {
                expect(data.length).to.be.above(3);
                expect(data[0].embed_url).to.be.a("string");
            })
                .then(() => done(), done);
        });
        it("Should work with a weird name format", (done) => {
            src_1.cspanvids.fetchVideoData("marcorubio")
                .then((data) => {
                expect(data.length).to.be.above(3);
                expect(data[0].embed_url).to.be.a("string");
            }).then(() => done(), done);
        });
        /**
         * For example, Ted Cruz's name in the url
         * would be "rcruz". Need to handle that.
         */
        it("Should work with a name that diffs from url", (done) => {
            src_1.cspanvids.fetchVideoData("Ted Cruz")
                .then((data) => {
                expect(data.length).to.be.above(3);
            }).then(() => done(), done);
        });
        it("Should work with a nonsense name", (done) => {
            src_1.cspanvids.fetchVideoData("aragsseafe")
                .then((data) => {
                expect(data instanceof Error).to.be.true;
            })
                .then(() => done(), done);
        });
    });
});

//# sourceMappingURL=data:application/json;charset=utf8;base64,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ZUFBUyxDQUFDLGNBQWMsQ0FBQyxZQUFZLENBQUM7aUJBQ25DLElBQUksQ0FBQyxDQUFDLElBQUksRUFBRSxFQUFFO2dCQUNiLE1BQU0sQ0FBQyxJQUFJLFlBQVksS0FBSyxDQUFDLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxJQUFJLENBQUM7WUFDM0MsQ0FBQyxDQUFDO2lCQUNILElBQUksQ0FBQyxHQUFHLEVBQUUsQ0FBQyxJQUFJLEVBQUUsRUFBRSxJQUFJLENBQUMsQ0FBQztRQUM1QixDQUFDLENBQUMsQ0FBQztJQUNMLENBQUMsQ0FBQyxDQUFBO0FBQ0osQ0FBQyxDQUFDLENBQUMiLCJmaWxlIjoidGVzdC9jcGFudmlkZW9zLnNwZWMuanMiLCJzb3VyY2VzQ29udGVudCI6WyJkZWNsYXJlIHZhciByZXF1aXJlOiBhbnk7XG5kZWNsYXJlIHZhciBkb25lOiBhbnk7XG5cbmltcG9ydCAqIGFzIGNoYWkgZnJvbSAnY2hhaSc7XG5pbXBvcnQgKiBhcyBtb2NoYSBmcm9tICdtb2NoYSc7XG5pbXBvcnQgKiBhcyByZXF1ZXN0IGZyb20gJ3JlcXVlc3QnO1xuaW1wb3J0ICogYXMgY2hhbGsgZnJvbSAnY2hhbGsnO1xuXG5pbXBvcnQgeyBjc3BhbnZpZHMgfSBmcm9tICcuLi9zcmMnO1xuaW1wb3J0IHsgZHVtbXlEYXRhIH0gZnJvbSAnLi9kdW1teWRhdGEnO1xuXG5jb25zdCBleHBlY3QgPSBjaGFpLmV4cGVjdDtcblxuXG5kZXNjcmliZShcImNzcGFudmlkZW9zXCIsICgpID0+IHtcblxuICBpdChcIlNob3VsZCBoYXZlIHRoZSBwcm9wZXIgdXJsLlwiLCAoKSA9PiB7XG4gICAgZXhwZWN0KGNzcGFudmlkcy5DU1BBTl9CQVNFX1VSTCkudG8uZXF1YWwoXCJodHRwczovL3d3dy5jLXNwYW4ub3JnL3BlcnNvbi8/XCIpO1xuICB9KTtcblxuXG4gIGl0KFwiU2hvdWxkIGhhdmUgdGhlIF9tYWtlUmVxdWVzdCBtZXRob2QgYXZhaWxhYmxlXCIsICgpID0+IHtcbiAgICBleHBlY3QoY3NwYW52aWRzKS50by5oYXZlLnByb3BlcnR5KFwiX21ha2VSZXF1ZXN0XCIpXG4gIH0pO1xuXG5cbiAgZGVzY3JpYmUoXCJfcGFyc2VSZXF1ZXN0Rm9yRGF0YVwiLCAoKSA9PiB7XG4gICAgY29uc3QgbW9ja0RvbSA9IGR1bW15RGF0YSgpLm1vY2tDU1BBTkRvbTtcbiAgICBjb25zdCBycCA9IGNzcGFudmlkcy5fcGFyc2VSZXF1ZXN0Rm9yRGF0YShtb2NrRG9tKTtcblxuICAgIGl0KFwiU2hvdWxkIGRldGVjdCBwcm9wZXIgYW1vdW50IG9mIGxpIGVsZW1lbnRzXCIsICgpID0+IHtcbiAgICAgIGV4cGVjdChycC5sZW5ndGgpLnRvLmJlLmVxdWFsKDYpO1xuICAgIH0pO1xuXG4gICAgaXQoXCJTaG91bGQgcHJvdmlkZSBwcm9wZXIgZm9yIGVhY2ggZWxlbWVudFwiLCAoKSA9PiB7XG4gICAgICBleHBlY3QocnBbMF0udGh1bWJuYWlsKS50by5iZS5hKCdzdHJpbmcnKTtcbiAgICAgIGV4cGVjdChycFszXS5kYXRlKS50by5iZS5hKCdzdHJpbmcnKTtcbiAgICAgIGV4cGVjdChycFs0XS50aXRsZSkudG8uYmUuYSgnc3RyaW5nJyk7XG4gICAgfSlcbiAgfSk7XG5cbiAgZGVzY3JpYmUoXCJfaXNCYWRVUkxcIiwgKCkgPT4ge1xuICAgIGl0KFwiU2hvdWxkIGdldCB0aGUgcHJvcGVyIFVSTCB3aGVuIGEgYmFkIG9uZSBpcyBwcm92aWRlZFwiLCAoKSA9PiB7XG4gICAgICByZXF1ZXN0KGNzcGFudmlkcy5DU1BBTl9CQURfVVJMICsgXCJUZWQgQ3J1elwiLCAoZXJyOiBFcnJvciwgcmVzcG9uc2U6IHJlcXVlc3QuUmVxdWVzdFJlc3BvbnNlLCBib2R5OiBzdHJpbmcpID0+IHtcbiAgICAgICAgY29uc3QgaXNCYWRVUkwgPSBjc3BhbnZpZHMuX2lzQmFkVVJMKGJvZHkpO1xuXG4gICAgICAgIGV4cGVjdChpc0JhZFVSTCkudG8uYmUudHJ1ZTtcbiAgICAgIH0pXG4gICAgfSlcbiAgfSk7XG5cbiAgZGVzY3JpYmUoXCJmZXRjaFZpZGVvRGF0YVwiLCAoKSA9PiB7XG5cbiAgICBpdCAoXCJTaG91bGQgd29yayBhcyBleHBlY3RlZCBmb3IgYSBub3JtYWwgbmFtZSBmb3JtYXRcIiwgKGRvbmUpID0+IHtcbiAgICAgIGNzcGFudmlkcy5mZXRjaFZpZGVvRGF0YShcIk1hcmNvIFJ1YmlvXCIpXG4gICAgICAudGhlbigoZGF0YSkgPT4ge1xuICAgICAgICBleHBlY3QoZGF0YS5sZW5ndGgpLnRvLmJlLmFib3ZlKDMpO1xuICAgICAgICBleHBlY3QoZGF0YVswXS5lbWJlZF91cmwpLnRvLmJlLmEoXCJzdHJpbmdcIik7XG4gICAgICB9KVxuICAgICAgLnRoZW4oKCkgPT4gZG9uZSgpLCBkb25lKVxuICAgIH0pO1xuICAgIFxuICAgIGl0KFwiU2hvdWxkIHdvcmsgd2l0aCBhIHdlaXJkIG5hbWUgZm9ybWF0XCIsIChkb25lKSA9PiB7XG4gICAgICBjc3BhbnZpZHMuZmV0Y2hWaWRlb0RhdGEoXCJtYXJjb3J1YmlvXCIpXG4gICAgICAudGhlbigoZGF0YSkgPT4ge1xuICAgICAgICBleHBlY3QoZGF0YS5sZW5ndGgpLnRvLmJlLmFib3ZlKDMpXG4gICAgICAgIGV4cGVjdChkYXRhWzBdLmVtYmVkX3VybCkudG8uYmUuYShcInN0cmluZ1wiKTtcbiAgICAgIH0pLnRoZW4oKCkgPT4gZG9uZSgpLCBkb25lKVxuICAgIH0pO1xuICAgIFxuICAgIC8qKlxuICAgICAqIEZvciBleGFtcGxlLCBUZWQgQ3J1eidzIG5hbWUgaW4gdGhlIHVybFxuICAgICAqIHdvdWxkIGJlIFwicmNydXpcIi4gTmVlZCB0byBoYW5kbGUgdGhhdC5cbiAgICAgKi9cbiAgICBpdChcIlNob3VsZCB3b3JrIHdpdGggYSBuYW1lIHRoYXQgZGlmZnMgZnJvbSB1cmxcIiwgKGRvbmUpID0+IHtcbiAgICAgIGNzcGFudmlkcy5mZXRjaFZpZGVvRGF0YShcIlRlZCBDcnV6XCIpXG4gICAgICAgIC50aGVuKChkYXRhKSA9PiB7XG4gICAgICAgICAgZXhwZWN0KGRhdGEubGVuZ3RoKS50by5iZS5hYm92ZSgzKTtcbiAgICAgICAgfSkudGhlbigoKSA9PiBkb25lKCksIGRvbmUpXG4gICAgfSk7XG5cbiAgICBpdChcIlNob3VsZCB3b3JrIHdpdGggYSBub25zZW5zZSBuYW1lXCIsIChkb25lKSA9PiB7XG4gICAgICBjc3BhbnZpZHMuZmV0Y2hWaWRlb0RhdGEoXCJhcmFnc3NlYWZlXCIpXG4gICAgICAgIC50aGVuKChkYXRhKSA9PiB7XG4gICAgICAgICAgZXhwZWN0KGRhdGEgaW5zdGFuY2VvZiBFcnJvcikudG8uYmUudHJ1ZTtcbiAgICAgICAgfSlcbiAgICAgIC50aGVuKCgpID0+IGRvbmUoKSwgZG9uZSk7XG4gICAgfSk7XG4gIH0pXG59KTtcbiJdfQ==
