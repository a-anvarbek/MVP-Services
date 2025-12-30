import { useState } from "react";
import {
  Armchair,
  Luggage,
  Plane,
  PlaneTakeoff,
  Plus,
  ShieldCheck,
  Utensils,
  Wifi,
  X,
  Zap,
} from "lucide-react";

interface AirportService {
  id: string;
  name: string;
  description: string;
  price: number;
  icon: LucideIcon;
}

interface SelectedService extends AirportService {
  quantity: number;
}

const airportServices: AirportService[] = [
  {
    id: "1",
    name: "Extra Legroom Seat",
    description: "Upgrade to a seat with extra legroom for more comfort",
    price: 45,
    icon: Armchair,
  },
  {
    id: "2",
    name: "Priority Boarding",
    description: "Board the aircraft before general passengers",
    price: 25,
    icon: PlaneTakeoff,
  },
  {
    id: "3",
    name: "Extra Baggage",
    description: "Add 23kg of checked baggage to your booking",
    price: 60,
    icon: Luggage,
  },
  {
    id: "4",
    name: "In-Flight Meal",
    description: "Pre-order a hot meal for your flight",
    price: 18,
    icon: Utensils,
  },
  {
    id: "5",
    name: "Lounge Access",
    description: "Relax in our premium lounge before your flight",
    price: 55,
    icon: Armchair,
  },
  {
    id: "6",
    name: "Wi-Fi Package",
    description: "Stay connected with unlimited in-flight Wi-Fi",
    price: 12,
    icon: Wifi,
  },
  {
    id: "7",
    name: "Travel Insurance",
    description: "Comprehensive coverage for your journey",
    price: 35,
    icon: ShieldCheck,
  },
  {
    id: "8",
    name: "Fast Track Security",
    description: "Skip the queues with fast track security access",
    price: 20,
    icon: Zap,
  },
];

function App() {
  const [selectedServices, setSelectedServices] =
    useState<SelectedService[]>([]);

  const onAdd = (service: AirportService) => {
    setSelectedServices((prev) => {
      const existing = prev.find((item) => item.id === service.id);

      if (existing) {
        return prev.map((item) =>
          item.id === service.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }

      return [...prev, { ...service, quantity: 1 }];
    });
  };

  const onRemove = (id: string) => {
    setSelectedServices((prev) =>
      prev.filter((item) => item.id !== id)
    );
  };

  const onPlaceOrder = () => {
    console.log("Order placed:", selectedServices);
    alert("Order placed successfully!");
    setSelectedServices([]);
  };

  const totalPrice = selectedServices.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  return (
    <div className="min-h-screen bg-gray-50">
      {/* HEADER */}
      <header className="bg-white border-b sticky top-0 z-10 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 py-4 flex gap-3 items-center">
          <div className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center">
            <Plane className="w-6 h-6 text-white" />
          </div>
          <div>
            <h1>Airport Services</h1>
            <p className="text-sm text-gray-600">
              Enhance your flight experience
            </p>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 py-8 grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* SERVICES */}
        <div className="lg:col-span-2 grid grid-cols-1 sm:grid-cols-2 gap-4">
          {airportServices.map((service) => (
            <div
              key={service.id}
              className="bg-white p-4 rounded-xl border flex flex-col gap-3 hover:shadow"
            >
              <div className="flex gap-3">
                <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                  <service.icon className="w-5 h-5 text-blue-600" />
                </div>
                <div>
                  <h3>{service.name}</h3>
                  <p className="text-sm text-gray-600">
                    {service.description}
                  </p>
                </div>
              </div>

              <div className="flex justify-between items-center mt-auto">
                <span className="text-blue-600">${service.price}</span>
                <button
                  onClick={() => onAdd(service)}
                  className="flex items-center gap-1 bg-black text-white px-3 py-2 rounded-xl"
                >
                  <Plus className="w-4 h-4" />
                  Add
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* ORDER SUMMARY */}
        <div>
          <div className="bg-white p-6 sticky top-4 rounded-xl border">
            <h2 className="mb-4">Order Summary</h2>

            <div className="space-y-3 mb-6">
              {selectedServices.length === 0 && (
                <p className="text-sm text-gray-500">
                  No services selected
                </p>
              )}

              {selectedServices.map((item) => (
                <div
                  key={item.id}
                  className="flex justify-between items-center border-b pb-3"
                >
                  <div>
                    <p>{item.name}</p>
                    <p className="text-sm text-gray-500">
                      ${item.price} x {item.quantity}
                    </p>
                  </div>

                  <div className="flex items-center gap-3">
                    <span>${item.price * item.quantity}</span>
                    <button
                      onClick={() => onRemove(item.id)}
                      className="text-gray-400 hover:text-red-600"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              ))}
            </div>

            <div className="border-t pt-4">
              <div className="flex justify-between mb-4">
                <span>Total</span>
                <span className="text-xl text-blue-600">
                  ${totalPrice}
                </span>
              </div>

              <button
                onClick={onPlaceOrder}
                className="w-full bg-blue-600 text-white py-2 rounded-xl"
              >
                Place Order
              </button>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

export default App;
