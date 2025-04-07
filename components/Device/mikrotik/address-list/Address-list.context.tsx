"use client";
import { emptyAddressList } from "@/service/data/addresslist";
import { DeviceService } from "@/service/DeviceService";
import { DeviceObject, DeviceObjectMikrotik } from "@/types/genieacs";
import { AddressListRow } from "@/types/mikrotik/addresslist";
import { Skeleton } from "primereact/skeleton";
import { Toast } from "primereact/toast";
import {
  useState,
  createContext,
  useRef,
  ReactNode,
  Dispatch,
  SetStateAction,
  RefObject,
  useEffect,
} from "react";
import ipaddr from "ipaddr.js";

interface AddressListContextProps {
  id: string;
  setId: Dispatch<SetStateAction<string>>;
  loading: boolean;
  setLoading: Dispatch<SetStateAction<boolean>>;
  device: DeviceObjectMikrotik | undefined;
  setDevice: Dispatch<SetStateAction<DeviceObjectMikrotik | undefined>>;
  dialog: boolean;
  setDialog: Dispatch<SetStateAction<boolean>>;
  dialogHeader: string;
  setDialogHeader: Dispatch<SetStateAction<string>>;
  data: AddressListRow;
  setData: Dispatch<SetStateAction<AddressListRow>>;
  requery: boolean;
  setRequery: Dispatch<SetStateAction<boolean>>;
  submitted: boolean;
  setSubmitted: Dispatch<SetStateAction<boolean>>;
  toast: RefObject<Toast | null>;
  saveIP: () => void;
}

export const AddressListContext = createContext({} as AddressListContextProps);

interface AddressListProviderProps {
  children: ReactNode;
  params: Promise<{ id: string }>;
}

export const AddressListProvider = ({
  children,
  params,
}: AddressListProviderProps) => {
  const [id, setId] = useState("");
  const [loading, setLoading] = useState<boolean>(true);
  const [dialog, setDialog] = useState(false);
  const [dialogHeader, setDialogHeader] = useState<string>("");
  const [data, setData] = useState<AddressListRow>(emptyAddressList);
  const [requery, setRequery] = useState(false);
  const [device, setDevice] = useState<DeviceObjectMikrotik>();
  const [submitted, setSubmitted] = useState(false);
  const toast = useRef<Toast>(null);

  useEffect(() => {
    params.then((params) => {
      setId(params.id);
    });
    if (id || requery) {
      DeviceService.getDetail(id).then((data: DeviceObject[]) => {
        setDevice(data[0] as DeviceObjectMikrotik);
        setLoading(false);
      });
      setRequery(false);
    }
  }, [params, id, requery]);

  if (loading || device === undefined) {
    return <Skeleton height="8rem"></Skeleton>;
  }

  const saveIP = async () => {
    setSubmitted(true);

    if (data.value.CIDR._value.trim()) {
      const cidr = data.value.CIDR._value;
      if (ipaddr.IPv4.isValidCIDR(cidr)) {
        const parseCIDR = ipaddr.IPv4.parseCIDR(cidr);
        const ip = parseCIDR[0].toNormalizedString();
        const subnetmask = ipaddr.IPv4.subnetMaskFromPrefixLength(
          parseCIDR[1]
        ).toNormalizedString();
        const parameters = [
          [`${data.key}.IPAddress`, ip, data.value.IPAddress._type],
          [`${data.key}.SubnetMask`, subnetmask, data.value.SubnetMask._type],
        ];

        const deviceID = encodeURIComponent(device._id);
        const response = await DeviceService.setParameterValues(
          deviceID,
          parameters
        );

        switch (response.status) {
          case 200:
            toast.current?.show({
              severity: "success",
              summary: "Success",
              detail: "Success Change IP",
            });
            break;
          case 400:
            toast.current?.show({
              severity: "error",
              summary: "Error 400",
              detail: "Bad Request",
            });
            break;
          case 500:
            toast.current?.show({
              severity: "error",
              summary: "Error 500",
              detail: "Internal Server Error",
            });
            break;
          default:
            toast.current?.show({
              severity: "error",
              summary: "Error",
              detail: "Unknown Error",
            });
            break;
        }

        setRequery(true);
        setDialog(false);
        setData(emptyAddressList);
      }
    }
  };

  const value: AddressListContextProps = {
    data,
    device,
    dialog,
    dialogHeader,
    id,
    loading,
    requery,
    saveIP,
    setData,
    setDevice,
    setDialog,
    setDialogHeader,
    setId,
    setLoading,
    setRequery,
    setSubmitted,
    submitted,
    toast,
  };

  return (
    <AddressListContext.Provider value={value}>
      {children}
    </AddressListContext.Provider>
  );
};
