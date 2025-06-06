import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const api = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({ 
    baseUrl: process.env.REACT_APP_API_URL || "https://interaction-app-server.onrender.com" 
  }),
  tagTypes: ["Room"],
  endpoints: (builder) => ({
    signin: builder.mutation({
      query: (data) => ({
        url: "users/signin",
        method: "POST",
        body: data,
      }),
    }),

    signup: builder.mutation({
      query: (data) => ({
        url: "users/signup",
        method: "POST",
        body: data,
      }),
    }),

    getUsers: builder.query({
      query: () => ({
        url: "users/get-users",
      }),
    }),

    createRoom: builder.mutation({
      query: (data) => ({
        url: `rooms/${data.userId}`,
        method: "POST",
        body: {
          name: data.roomName,
          host: data.userId,
        },
      }),
      async onQueryStarted(arg, { dispatch, queryFulfilled }) {
        try {
          const { data: newRoom } = await queryFulfilled;
          
          dispatch(
            api.util.updateQueryData('getRooms', { userId: arg.userId }, (draft) => {
              if (draft) {
                if (!draft.rooms) {
                  draft.rooms = [];
                }
                
                if (Array.isArray(draft.rooms)) {
                  draft.rooms.splice(0, 0, newRoom);
                }
              }
            })
          );
        } catch (error) {
          // Silent error handling
        }
      },
      invalidatesTags: ["Room"],
    }),

    deleteRoom: builder.mutation({
      query: (data) => ({
        url: `rooms/${data.userId}/${data.roomId}/delete-room`,
        method: "POST",
      }),
      invalidatesTags: ["Room"],
    }),

    editRoom: builder.mutation({
      query: (data) => ({
        url: `rooms/${data.userId}/${data.roomId}/edit-room`,
        method: "POST",
        body: { isProtected: data.isProtected },
      }),
      invalidatesTags: (result, error, arg) => [{ type: "Room", id: arg.id }],
    }),

    getRooms: builder.query({
      query: ({ userId }) => ({
        url: `rooms/${userId}`,
      }),
      transformResponse: (response) => {
        if (Array.isArray(response)) {
          return { rooms: response };
        }
        return response;
      },
      providesTags: ["Room"],
    }),

    getRoom: builder.query({
      query: ({ userId, roomId }) => ({
        url: `rooms/${userId}/${roomId}`,
      }),
      providesTags: (result, error, { roomId }) => [{ type: "Room", id: roomId }],
    }),

    addUserInRoom: builder.mutation({
      query: (data) => ({
        url: `rooms/${data.userId}/${data.roomId}/add-user`,
        method: "PATCH",
        body: { newUserId: data.newUserId },
      }),
      invalidatesTags: (result, error, arg) => [{ type: "Room", id: arg.roomId }],
    }),

    removeUserFromRoom: builder.mutation({
      query: (data) => ({
        url: `rooms/${data.userId}/${data.roomId}/remove-user`,
        method: "PATCH",
        body: { newUserId: data.newUserId },
      }),
      invalidatesTags: (result, error, arg) => [{ type: "Room", id: arg.roomId }],
    }),

    postMessage: builder.mutation({
      query: (data) => ({
        url: `rooms/${data.userId}/${data.roomId}/message`,
        method: "POST",
        body: { message: data.message },
      }),
      invalidatesTags: (result, error, arg) => [{ type: "Room", id: arg.roomId }],
    }),

    uploadFile: builder.mutation({
      query: (data) => ({
        url: `rooms/${data.userId}/${data.roomId}/upload`,
        method: 'POST',
        body: data.file,
      }),
      invalidatesTags: (result, error, arg) => [{ type: "Room", id: arg.roomId }],
    }),

    deleteMessage: builder.mutation({
      query: ({ userId, roomId, messageId }) => ({
        url: `rooms/${userId}/${roomId}/message/${messageId}`,
        method: "DELETE",
        headers: {
          'Content-Type': 'application/json',
        }
      }),
      async onQueryStarted({ userId, roomId, messageId }, { dispatch, queryFulfilled }) {
        const patchResult = dispatch(
          api.util.updateQueryData('getRoom', { userId, roomId }, (draft) => {
            if (draft.messages && Array.isArray(draft.messages)) {
              const messageIndex = draft.messages.findIndex(msg => msg._id === messageId);
              if (messageIndex !== -1) {
                draft.messages.splice(messageIndex, 1);
              }
            }
          })
        );
        
        try {
          await queryFulfilled;
        } catch {
          patchResult.undo();
        }
      },
      invalidatesTags: (result, error, arg) => [{ type: "Room", id: arg.roomId }],
    }),
  }),
});

export const {
  useSigninMutation,
  useSignupMutation,
  useGetUsersQuery,
  useCreateRoomMutation,
  useDeleteRoomMutation,
  useEditRoomMutation,
  useGetRoomQuery,
  useGetRoomsQuery,
  useAddUserInRoomMutation,
  useRemoveUserFromRoomMutation,
  usePostMessageMutation,
  useUploadFileMutation,
  useDeleteMessageMutation,
} = api;
