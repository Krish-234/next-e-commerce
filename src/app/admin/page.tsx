import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { db } from "@/db/db";
import { formatCurrency, formatNumber } from "@/lib/formatter";

async function getSalesData() {
  const data = await db.order.aggregate({
    _sum: { pricePaidInRupees: true },
    _count: true,
  });

  return {
    amount: data._sum.pricePaidInRupees || 0,
    numberOfSales: data._count,
  };
}

  async function getUserData() {
    const [userCount, orderData] = await Promise.all([
      db.user.count(),
      db.order.aggregate({
        _sum: { pricePaidInRupees: true },
      })
    ])

    return {
      userCount,
      avarageValuePerUser: userCount === 0 ? 0 : (orderData._sum.pricePaidInRupees || 0) / userCount / 100,
    }
  }

  async function getProductData() {
   const [activeCount, inactiveCount] = await Promise.all([
      db.product.count({where: {isAvailableForPurchase: true}}),
      db.product.count({where: {isAvailableForPurchase: false}})
    ])

    return {activeCount,inactiveCount};
  }


export default async function AdminDashboard() {
  const [salesData, userData, productData] = await Promise.all([
    getSalesData(),
    getUserData(),
    getProductData()
  ])

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      <DashboardCard
        title="sales"
        subtitle={`${formatNumber(salesData.numberOfSales)} Orders`}
        body={formatCurrency(salesData.amount)}
      />
      <DashboardCard
        title="Customer"
        subtitle={`${formatCurrency(userData.avarageValuePerUser)} Avarage Value`}
        body={`${formatNumber(userData.userCount)}`}
      />
      <DashboardCard
        title="Active Products"
        subtitle={`${formatNumber(productData.inactiveCount)} Inactive`}
        body={formatNumber(productData.activeCount)}
      />
    </div>
  );
}

type DashboradCardProps = {
  title: string;
  subtitle: string;
  body: string;
};

function DashboardCard({ title, subtitle, body }: DashboradCardProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>{title}</CardTitle>
        <CardDescription>{subtitle}</CardDescription>
      </CardHeader>
      <CardContent>
        <p>{body}</p>
      </CardContent>
    </Card>
  );
}
