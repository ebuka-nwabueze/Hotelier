import {
  useMutation,
  useQuery,
  useQueryClient,
  UseMutationResult,
} from "react-query";
import {
  FullTicketResponseData,
  UpdateTicketData,
  UserResponseData,
  UpdateTicketResponse,
} from "../../types/types";
import { getAllTickets, getSingleTicket, ticketUpdate } from "./ticketApi";

export const useAllTickets = () => {
  const queryClient = useQueryClient();
  const user = queryClient.getQueryData<UserResponseData>("user");
  const token = user?.token as string;
  return useQuery<FullTicketResponseData[], Error>("tickets", async () => {
    const results = await getAllTickets(token);
    return results;
  });
};

export const useSingleTicket = (id: string | undefined) => {
  const queryClient = useQueryClient();
  const user = queryClient.getQueryData<UserResponseData>("user");
  const token = user?.token as string;
  return useQuery<FullTicketResponseData, Error>(
    ["ticket", id],
    async () => {
      const results = await getSingleTicket(id, token);
      return results;
    },
    {
      enabled: !!id,
    }
  );
};

export const useUpdateTicket = (): UseMutationResult<
FullTicketResponseData,
Error, 
UpdateTicketData
> => {
  const queryClient = useQueryClient();
  const user = queryClient.getQueryData<UserResponseData>("user");
  const token = user?.token as string;
  return useMutation( async (ticketData) =>  await ticketUpdate(ticketData, token), {
    onSuccess: (data) => {
      // Update data quickly 
      queryClient.setQueryData(["ticket", data.id],data) 
    }
  });
};
