import React from 'react'

function ConfirmInformation() {
  return (
    <div className="flex flex-col">
      <div className="overflow-x-auto sm:-mx-6 lg:-mx-8">
        <div className="inline-block min-w-full py-2 sm:px-6 lg:px-8">
          <h5 style={{
            padding: '10px 0',
            marginLeft: '55px'
          }}>Thông tin xác nhận</h5>
          <div className="overflow-hidden flex gap-10" style={{
            padding: '0 60px'
          }}>
            <table
              className=" w-1/2 border text-center text-sm font-light dark:border-neutral-500">
              <th className="border-b font-medium dark:border-neutral-500 px-6 py-4" scope="col" >Ký xác nhận tiếp nhận xe</th>
              <tr>
                <th className="border-b dark:border-neutral-500 flex">
                  <td
                    className="whitespace-nowrap border-r px-6 py-4 font-medium dark:border-neutral-500 signing-position">
                    Khách hàng ký
                  </td>
                  <td
                    className="whitespace-nowrap px-6 py-4 font-medium dark:border-neutral-500 signing-position">
                    CVDV ký
                  </td>
                </th>
              </tr>
              {/* </tbody> */}
            </table>
            <table
              className=" w-1/2 border text-center text-sm font-light dark:border-neutral-500">
              {/* <thead className="border-b font-medium dark:border-neutral-500"> */}
              <th className="border-b font-medium dark:border-neutral-500 px-6 py-4" scope="col" >Ký xác nhận tiếp nhận xe</th>
              {/* </thead> */}
              {/* <tbody> */}
              <tr>
                <th className="border-b dark:border-neutral-500 flex">
                  <td
                    className="whitespace-nowrap border-r px-6 py-4 font-medium dark:border-neutral-500 signing-position">
                    Khách hàng ký
                  </td>
                  <td
                    className="whitespace-nowrap  px-6 py-4 font-medium dark:border-neutral-500 signing-position">
                    CVDV ký
                  </td>
                </th>
              </tr>
              {/* </tbody> */}
            </table>
          </div>
        </div>
      </div>
    </div >
  )
}

export default ConfirmInformation
