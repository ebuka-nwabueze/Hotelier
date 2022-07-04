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
  DeleteTicketData,
  NewTicketData,
} from "../../types/types";
import {
  getAllTickets,
  getSingleTicket,
  newTicket,
  ticketDelete,
  ticketUpdate,
} from "./ticketApi";

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

// Create Ticket Mutation
export const useCreateTicket = (): UseMutationResult<
  FullTicketResponseData,
  Error,
  NewTicketData
> => {
  const queryClient = useQueryClient();
  const user = queryClient.getQueryData<UserResponseData>("user");
  const token = user?.token as string;
  return useMutation(async (ticketData) => await newTicket(ticketData, token), {
    onSuccess: (data) => {
      // Create new ticket with data quickly
      const previousTickets:
        | FullTicketResponseData[]
        | undefined = queryClient.getQueryData("tickets");
      if(previousTickets){
        queryClient.setQueryData(["tickets"], [...previousTickets, data]);
      }
      queryClient.invalidateQueries(["tickets"]);
    },
  });
};

// Update Ticket Mutation
export const useUpdateTicket = (): UseMutationResult<
  FullTicketResponseData,
  Error,
  UpdateTicketData
> => {
  const queryClient = useQueryClient();
  const user = queryClient.getQueryData<UserResponseData>("user");
  const token = user?.token as string;
  return useMutation(
    async (ticketData) => await ticketUpdate(ticketData, token),
    {
      onSuccess: (data) => {
        // Update data quickly
        queryClient.setQueryData(["ticket", data.id], data);
      },
    }
  );
};

//Delete Ticket mutation
export const useDeleteTicket = (): UseMutationResult<string, Error, string> => {
  const queryClient = useQueryClient();
  const user = queryClient.getQueryData<UserResponseData>("user");
  const token = user?.token as string;
  return useMutation((ticketId) => ticketDelete(ticketId, token), {
    onSuccess: (data) => {
      // Update data quickly
      queryClient.invalidateQueries("tickets");
    },
  });
};
