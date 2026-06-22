import { Card, CardContent, CardHeader, CardTitle } from "@/shared/components/ui/card";
import { listEquipmentOrders } from "@/modules/equipment/equipment-order.service";
import { formatDate } from "@/lib/utils";

export const dynamic = "force-dynamic";

export default async function EquipmentOrdersPage() {
  let orders: Awaited<ReturnType<typeof listEquipmentOrders>> = [];

  try {
    orders = await listEquipmentOrders();
  } catch {
    orders = [];
  }

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-primary">Equipment Orders</h1>
        <p className="text-slate-500">Buy Now requests from the equipment page</p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>All Orders ({orders.length})</CardTitle>
        </CardHeader>
        <CardContent>
          {orders.length === 0 ? (
            <p className="text-sm text-slate-500">No equipment orders yet.</p>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-slate-200 text-left">
                    <th className="pb-3 pr-4 font-semibold text-slate-600">Date</th>
                    <th className="pb-3 pr-4 font-semibold text-slate-600">Name</th>
                    <th className="pb-3 pr-4 font-semibold text-slate-600">Mobile</th>
                    <th className="pb-3 pr-4 font-semibold text-slate-600">District</th>
                    <th className="pb-3 pr-4 font-semibold text-slate-600">Equipment</th>
                    <th className="pb-3 font-semibold text-slate-600">Address</th>
                  </tr>
                </thead>
                <tbody>
                  {orders.map((order) => (
                    <tr key={order.id} className="border-b border-slate-100 align-top">
                      <td className="py-3 pr-4 whitespace-nowrap text-slate-600">
                        {formatDate(order.createdAt)}
                      </td>
                      <td className="py-3 pr-4 font-medium text-primary">{order.name}</td>
                      <td className="py-3 pr-4 text-slate-600">{order.mobile}</td>
                      <td className="py-3 pr-4 text-slate-600">{order.district}</td>
                      <td className="py-3 pr-4 text-slate-600">{order.equipment}</td>
                      <td className="py-3 text-slate-600">{order.address}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
